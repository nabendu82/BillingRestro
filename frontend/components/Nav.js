import Link from 'next/link';
import { slide as Menu } from "react-burger-menu";
import styled from 'styled-components';
import User from './User';
import Signout from './Signout';
import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from './Bill';


const StyledAnchor = styled.a`
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
    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false
        }
    }

    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen })
    }

    closeMenu() {
        this.setState({ menuOpen: false })
    }
    render() {
        return (
            <User>
                {({ data }) => (
                    <Menu noOverlay width={280}
                        isOpen={this.state.menuOpen}
                        onStateChange={(state) => this.handleStateChange(state)}>
                        { data.me && (
                            <>
                                <Link href="/items">
                                    <StyledAnchor onClick={() => this.closeMenu()}>Menu</StyledAnchor>
                                </Link>
                                <Link href="/orders">
                                    <StyledAnchor onClick={() => this.closeMenu()}>Orders</StyledAnchor>
                                </Link>
                            </>
                        )}
                        {data.me && data.me.permissions.some(permission => ['ADMIN', 'ITEMCREATE'].includes(permission)) && (
                            <>
                                <Link href="/adddish">
                                    <StyledAnchor onClick={() => this.closeMenu()}>Add Dish</StyledAnchor>
                                </Link>
                            </>
                        )}
                        {data.me && data.me.permissions.some(permission => ['ADMIN', 'PERMISSIONUPDATE'].includes(permission)) && (
                            <>
                                <Link href="/permissions">
                                    <StyledAnchor onClick={() => this.closeMenu()}>Permissions</StyledAnchor>
                                </Link>
                                <Link href="/signup">
                                    <StyledAnchor onClick={() => this.closeMenu()}>Signup</StyledAnchor>
                                </Link>
                            </>
                        )}
                        { data.me && (
                            <>
                                <Signout />
                                <Mutation mutation={TOGGLE_CART_MUTATION}>
                                {(toggleCart) => (
                                    <StyledAnchor onClick={toggleCart}>Bill</StyledAnchor>
                                )}
                                </Mutation>
                            </>
                        )}
                        {!data.me && (
                            <>
                                <Link href="/reqreset">
                                    <StyledAnchor onClick={() => this.closeMenu()}>Reset</StyledAnchor>
                                </Link>
                                <Link href="/signin">
                                    <StyledAnchor onClick={() => this.closeMenu()}>Sign In</StyledAnchor>
                                </Link>
                            </>
                        )}

                    </Menu>
                )}
            </User>

        )
    }

}

export default Nav;

