import React, {Component} from 'react';
import './header.css';


class Header extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          enableMenu: false,
          buttonText: "🞬"
        }
      }
    
    showHideMenu = (event) => {
        let enableMenu = !this.state.enableMenu;
        if (enableMenu) {
            this.setState({enableMenu, buttonText: "☰"});
        } else {
            this.setState({enableMenu, buttonText: "🞬"});
        }
    }

    render() {
        let liClass = this.state.enableMenu ? true : false

        return (
            <nav>
                <ul className="headerList">
                    <button onClick={this.showHideMenu}> {this.state.buttonText} </button>
                    <li hidden={liClass}><a>EXERCISES</a></li>
                    <li hidden={liClass}><a>HOME</a></li>
                    <li hidden={liClass}><a>CREATE</a></li>
                </ul>
            </nav>
        );
    }
}

export default Header;