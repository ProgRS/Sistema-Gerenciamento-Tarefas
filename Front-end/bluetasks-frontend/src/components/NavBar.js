import React, { Component } from 'react';
import AuthService from '../api/AuthService';
import { APP_NAME } from '../constants';
import NavBarItem from './NavBarItem';

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [
        { name: "Listar Tarefas", href: "/", active: true },
        { name: "Nova tarefa", href: "/form", active: false }
      ]
    }

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onLogoutHandler = this.onLogoutHandler.bind(this);
  }

  onClickHandler(itemClicked) {
    const items = [...this.state.items];

    items.forEach(item => {
      if (item.name === itemClicked.name) {
        item.active = true;
      } else {
        item.active = false;
      }
    })

    this.setState({ items });
  }

  onLogoutHandler(){
        AuthService.logout();
        this.props.onLinkClick();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">{APP_NAME}</span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <div className="navbar-nav mr-auto">
              {this.state.items.map(
                i => <NavBarItem
                  key={i.name}
                  item={i}
                  onClick={this.onClickHandler} />)}

              { AuthService.isAuthenticated() ? 
                <NavBarItem
                 item={{ name: "Logout", active:false, href: "#"} }
                 onClick={this.onLogoutHandler} />
               : ""
              }
            </div>
             <span className='navbar-text'>
                { AuthService.isAuthenticated() ? 
                `Olá, ${AuthService.getJWTTokenData().displayName}!` : "" }
               </span> 


          </div>
        </nav>

      </div>
    );
  }
}

export default NavBar;