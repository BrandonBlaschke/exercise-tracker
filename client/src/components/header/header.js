import React, {Component} from 'react';
import './header.css';
import axios from 'axios'
import Modal from '../modal/modal';
import ModalAddExer from '../modal-add-exercise/modalAddExer';
import ModalError from '../modal-error/modalError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import logo from '../../assets/logo.png'


class Header extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          modalOpen: false,
          error: false
        }
      }

    toggleModal = () => {
        this.setState({modalOpen: !this.state.modalOpen});
    }

    signOut = () => {
        const token = document.cookie.split(';')[0].split('=')[1]
        const headers = {
            headers: {Authorization: `Bearer ${token}`}
        }

        axios.post('/user/logout', {}, headers)
        .then((res) => {
            this.setState({error: false});
            this.props.history.push('/');
        })
        .catch((error) => {
            this.setState({error: true, modalOpen: true});
        })
    }

    render() {

        let modal;
        if (this.state.modalOpen && this.state.error) {
            modal = <ModalError onClose={this.toggleModal} title="Error">Error when signing out.</ModalError>
        } else {
            modal = <ModalAddExer close={this.toggleModal} update={this.props.update}/>
        }

        return (
            <nav>
                <ul className="headerList">
                    <li><a onClick={this.toggleModal} title="Add Exercise"><FontAwesomeIcon icon={faPlus} size="2x"/></a></li>
                    <li><Link to="/main" style={{textDecoration: 'none', color:"white"}}><img alt="logo" width="50" height="50" src={logo}/></Link></li>
                    <li><a title="Sign Out" onClick={this.signOut}><FontAwesomeIcon icon={faSignOutAlt} size="2x"/></a></li>
                </ul>
                <Modal show={this.state.modalOpen} onClose={this.toggleModal}>
                    {modal}
                </Modal>
            </nav>
        );
    }
}

export default Header;