import React, {Component} from 'react';
import './certificates.component.css';
import SearchCertificatesComponent from './search/search.certificates.component';
import GridCertificatesComponent from './grid/grid.certificates.component';
import PaginationCertificatesComponent from './pagination/pagination.certificates.component';
import axios from 'axios';
import CertificatesUrlService from './certificatesUrl.service';

class CertificatesComponent extends Component {
    constructor(props) {
        super(props);
        this.pageIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        this.pageDimensions = [5, 25, 50, 100];
        this.pageSizeParamName = 'pageSize';
        this.state = {
            certificates: null,
            totalPages: null,
            page: 1,
            size: this.retrievePageSize(),
            startPageInSection: 1,
            lastPageInSection: this.pageIndexes.length,
            certificateType: 'All',
        };
        this.filters = {};
        this.filterInput = '';
        this._filterRegex = {
            price_gt: /\$\(>[\d]+\)/,
            price_lt: /\$\(<[\d]+\)/,
            price_eq: /\$\([\d]+\)/,
            tag_eq: /#\([A-Za-z]+\)/
        };
        this._certificatesUrlService = new CertificatesUrlService();
    }

    componentDidMount() {
        let url = this._certificatesUrlService.buildUrlToGC(this.state.page, this.state.size, this.filters);
        this.getCertificates(url);
    }

    retrievePageSize() {
        return sessionStorage.getItem(this.pageSizeParamName) || 5;
    }

    searchByFilter = (filters, input) => {
        this.filters = filters;
        this.filterInput = input;
        this.setState({
            page: 1,
            startPageInSection: 1,
            lastPageInSection: this.pageIndexes.length,
        });
        this.getCertificateByType(1, this.retrievePageSize());
    };

    searchByTag = (tag) => {
        let tagSearchExp = '#(' + tag + ')';

        // this.setState({
        //     filterInput: (this.state.filterInput === undefined || this.state.filterInput.lenght === 0) ?
        //         tagSearchExp : this.state.filterInput.match(this._filterRegex.tag_eq) == null ?
        //             (this.state.filterInput + ' ' + tagSearchExp) :
        //             this.state.filterInput.replace(this._filterRegex.tag_eq, tagSearchExp)
        // });

        this.filterInput = (this.filterInput === undefined || this.filterInput.lenght === 0) ?
            tagSearchExp : this.filterInput.match(this._filterRegex.tag_eq) == null ?
                (this.filterInput + ' ' + tagSearchExp) :
                this.filterInput.replace(this._filterRegex.tag_eq, tagSearchExp);

        this.filters.tag_eq = tag;
        this.searchByFilter(this.filters, this.filterInput);
    };

    previousSection() {
        this.setState({
            page: this.state.startPageInSection - 1,
            lastPageInSection: this.state.lastPageInSection - this.pageIndexes.length,
            startPageInSection: this.state.startPageInSection - this.pageIndexes.length,
        });
        this.getCertificateByType(this.state.startPageInSection - 1, this.state.size);
    }

    nextSection() {
        this.setState({
            page: this.state.lastPageInSection + 1,
            startPageInSection: this.state.startPageInSection + this.pageIndexes.length,
            lastPageInSection: this.state.lastPageInSection + this.pageIndexes.length,
        });
        this.getCertificateByType(this.state.lastPageInSection + 1, this.state.size);
    }

    getPageByNum = (num) => {
        this.setState({
            page: num,
        });
        this.getCertificateByType(num, this.state.size);
    };

    previousPage() {
        let previousPage = this.state.page - 1;
        if (previousPage > 1 && previousPage < this.state.startPageInSection) {
            this.setState({
                page: previousPage,
                lastPageInSection: previousPage,
                startPageInSection: this.state.startPageInSection - this.pageIndexes.length,
            });
        } else {
            this.setState({
                page: previousPage,
            });
        }
        this.getCertificateByType(previousPage, this.state.size);
    }

    nextPage() {
        let nextPage = this.state.page + 1;
        if (nextPage > this.state.lastPageInSection) {
            this.setState({
                page: nextPage,
                startPageInSection: nextPage,
                lastPageInSection: this.state.lastPageInSection + this.pageIndexes.length,
            });
        } else {
            this.setState({
                page: nextPage,
            });
        }
        this.getCertificateByType(nextPage, this.state.size);
    }

    setPageSize = (size) => {
        this.setState({
            page: 1,
            size: size,
        });
        this.getCertificateByType(1, size);
        sessionStorage.setItem(this.pageSizeParamName, size);
    };

    getCertificateByType(page, size) {
        if (this.state.certificateType == 'All') {
            let url = this._certificatesUrlService.buildUrlToGC(page, size, this.filters);
            this.getCertificates(url);
        }
        if (this.state.certificateType == 'My certificates') {
            //let url = this.buildUrlToUC(this.page, this.size);
            //this.getUserCertificates(url);
        }
    }

    getCertificates(url) {
        axios.get(url)
            .then((response) => {
                this.setState({
                    certificates: response.data.result,
                    totalPages: response.data.totalPages,
                });

            })
            .catch((error) => {
                console.log(error);//ERROR HANDLING
            });
    }

    render() {
        return (
            <div className="certificates-body-container main-component-section">
                <SearchCertificatesComponent
                    filterInput={this.filterInput}
                    setFilterInput={this.setFilterInput}
                    filterRegex={this._filterRegex}
                    search={this.searchByFilter}
                />
                <GridCertificatesComponent
                    certificates={this.state.certificates}
                    searchByTag={this.searchByTag}
                />
                <PaginationCertificatesComponent
                    pageIndexes={this.pageIndexes}
                    startPageInSection={this.state.startPageInSection}
                    lastPageInSection={this.state.lastPageInSection}
                    page={this.state.page}
                    totalPages={this.state.totalPages}
                    pageDimensions={this.pageDimensions}
                    previousSection={() => this.previousSection()}
                    nextSection={() => this.nextSection()}
                    getPageByNum={this.getPageByNum}
                    previousPage={() => this.previousPage()}
                    nextPage={() => this.nextPage()}
                    setPageSize={this.setPageSize}
                    pageSizeParamName={this.pageSizeParamName}
                />
            </div>
        );
    }
}

export default CertificatesComponent;