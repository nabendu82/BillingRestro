import Link from 'next/link';
import { slide as Menu } from "react-burger-menu";
import styled from 'styled-components';

const StyledAnchor=styled.a`
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    color: #FFFAFA;
`;

class Nav extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          menuOpen: false
        }
      }

      handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})
      }

      closeMenu () {
        this.setState({menuOpen: false})
      }
    render() {
        return (
            <Menu noOverlay width={ 280 }
                isOpen={this.state.menuOpen}
                onStateChange={(state) => this.handleStateChange(state)}>
                <Link href="/items">
                    <StyledAnchor onClick={() => this.closeMenu()}>Items</StyledAnchor>
                </Link>
                <Link href="/adddish">
                    <StyledAnchor onClick={() => this.closeMenu()}>Add Dish</StyledAnchor>
                </Link>
                <Link href="/signup">
                    <StyledAnchor onClick={() => this.closeMenu()}>Signup</StyledAnchor>
                </Link>
                <Link href="/orders">
                    <StyledAnchor onClick={() => this.closeMenu()}>Orders</StyledAnchor>
                </Link>
            </Menu>
        )
    }

}

export default Nav;
