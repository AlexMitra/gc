import React, {Component} from 'react';
import './pagination.certificates.component.css';

import {FormattedMessage} from 'react-intl';

class PaginationCertificatesComponent extends Component {
    constructor(props) {
        super(props);
    }

    getPreviousPageBtnClass() {
        let previousPageBtnClass = 'pagination-way-button ';
        previousPageBtnClass += this.props.page > 1 ? 'pagination-way-button-enabled' : 'pagination-way-button-disabled';
        return previousPageBtnClass;
    }

    getNextPageBtnClass() {
        let nextPageBtnClass = 'pagination-way-button ';
        nextPageBtnClass += this.props.page < this.props.totalPages ? 'pagination-way-button-enabled' : 'pagination-way-button-disabled';
        return nextPageBtnClass;
    }

    getPreviousSectionBtnClass() {
        let previousSectionBtnClass = 'pagination-number-button ';
        previousSectionBtnClass += this.props.startPageInSection > 1 ?
            'pagination-number-button-enabled' : 'pagination-number-button-disabled';
        return previousSectionBtnClass;
    }

    getNextSectionBtnClass() {
        let nextSectionBtnClass = 'pagination-number-button ';
        nextSectionBtnClass += this.props.lastPageInSection < this.props.totalPages ?
            'pagination-number-button-enabled' : 'pagination-number-button-disabled';
        return nextSectionBtnClass;
    }

    introduceOptions() {
        return this.props.pageDimensions.map((dimension, index) =>
            <option key={index} value={dimension}>{dimension}</option>
        );
    }

    handlePageSizeChange = (e) => {
        if(e){
            this.props.setPageSize(e.target.value);
        }
    };

    introducePages() {
        return this.props.pageIndexes.map((index) =>
            ((this.props.startPageInSection + index) < this.props.totalPages && (this.props.startPageInSection + index) !== this.props.page) ?
                <span key={index}>
                    <button className="pagination-number-button pagination-number-button-enabled"
                            onClick={() => this.props.getPageByNum(this.props.startPageInSection + index)}>
                        {this.props.startPageInSection + index}
                    </button>
                </span>
                : ((this.props.startPageInSection + index) < this.props.totalPages && (this.props.startPageInSection + index) === this.props.page) ?
                <span key={index}>
                    <button className="pagination-number-button pagination-number-button-current">
                        {this.props.startPageInSection + index}
                    </button>
                </span>
                : <span key={index}>
                    <button className="pagination-number-button pagination-number-button-disabled" disabled={true}>
                        {this.props.startPageInSection + index}
                    </button>
                </span>
        );
    }

    render() {
        const pages = this.introducePages();
        const previousSectionBtnClass = this.getPreviousSectionBtnClass();
        const nextSectionBtnClass = this.getNextSectionBtnClass();
        const previousPageBtnClass = this.getPreviousPageBtnClass();
        const nextPageBtnClass = this.getNextPageBtnClass();
        const pageSizeOptions = this.introduceOptions();
        return (
            <div className="certificates-pagination-container">
                <div className="page-number-buttons-container">

                    <span className="certificate-page-size-section">
                        <FormattedMessage id="CERTIFICATES_PAGE_SIZE" defaultMessage="Page size"/>
                        <select className="certificates-page-size-select"
                                value={sessionStorage.getItem(this.props.pageSizeParamName)}
                                onChange={this.handlePageSizeChange}>
                            {pageSizeOptions}
                        </select>
                    </span>

                    <button className={previousSectionBtnClass}
                            onClick={() => this.props.previousSection()} disabled={this.props.startPageInSection <= 1}>
                        <i className="fa fa-angle-double-left fa-lg" aria-hidden="true"></i>
                    </button>

                    {pages}

                    <button className={nextSectionBtnClass}
                            onClick={() => this.props.nextSection()}
                            disabled={this.props.page >= this.props.totalPages}>
                        <i className="fa fa-angle-double-right fa-lg" aria-hidden="true"></i>
                    </button>
                </div>

                <div className="page-buttons-container">
                    <div className="pagination-way-button-container">
                        <button className={previousPageBtnClass}
                                onClick={() => this.props.previousPage()} disabled={this.props.page <= 1}>
                            <i className="fa fa-long-arrow-left fa-lg" aria-hidden="true"></i>
                            <span>
                                <FormattedMessage id="CERTIFICATES_PREVIOUS_BUTTON" defaultMessage="Previous"/>
                            </span>
                        </button>
                    </div>
                    <div className="pagination-way-button-container align-right">
                        <button className={nextPageBtnClass}
                                onClick={() => this.props.nextPage()}
                                disabled={this.props.page >= this.props.totalPages}>
                            <span>
                                <FormattedMessage id="CERTIFICATES_NEXT_BUTTON" defaultMessage="Next"/>
                            </span> <i className="fa fa-long-arrow-right fa-lg" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}

export default PaginationCertificatesComponent;