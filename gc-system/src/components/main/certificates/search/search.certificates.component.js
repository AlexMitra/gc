import React, {Component} from 'react';
import './search.certificates.component.css';

import {FormattedMessage} from 'react-intl';

class SearchCertificatesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterInput: '',
        };
        this._filterRegex = this.props.filterRegex;
    }

    searchByFilter = (input) => {
        this.filters = {};
        if (input) {
            let searchQuery = '';
            let searchParam = '';
            Object.keys(this._filterRegex).forEach((key) => {

                if (input.match(this._filterRegex[key]) != null) {
                    searchParam = input.match(this._filterRegex[key]);
                    input = input.replace(this._filterRegex[key], ' ');
                    searchQuery += ` ${searchParam}`;
                    searchParam = searchParam.toString().replace(/[$|#|(|)|<|>]/g, '');
                    this.filters[key] = searchParam;
                }
            });
            input = input.replace(/\s\s+/g, ' ').trim();

            if (input.length > 0) {
                this.filters.search = input;
                searchQuery = searchQuery.length > 0 ? `${input} ${searchQuery.trim()}` : input;
            }
            this.setState({
                filterInput: searchQuery,
            });
        }
        this.props.search(this.filters, this.state.filterInput);
    };

    handleInputChange = (e) => {
        if (e) {
            this.setState({
                filterInput: e.target.value,
            });
        }
    };

    render() {
        return (
            <div className="certificates-search-container">
                <FormattedMessage id="CERTIFICATES_SEARCH_INPUT" defaultMessage="Search...">
                    {(msg) => <input className="search-element search-input" type="text" placeholder={msg}
                                     value={this.state.filterInput}
                                     onChange={this.handleInputChange}/>}
                </FormattedMessage>
                <button className="search-element search-button"
                        onClick={() => this.searchByFilter(this.state.filterInput)}>
                    <FormattedMessage id="CERTIFICATES_GO_BUTTON" defaultMessage="Go!"/>
                </button>
            </div>
        );
    }
}

export default SearchCertificatesComponent;