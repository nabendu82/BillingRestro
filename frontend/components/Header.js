import Nav from './Nav';
import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import Bill from './Bill';
import Search from './Search';

Router.events.on('routeChangeStart', (url) => {
    console.log(`Loading: ${url}`)
    NProgress.start()
});
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const Logo = styled.h1`
    font-size: 2.5rem;
    position: relative;
    z-index: 2;
    transform: skew(-7deg);
    a{
        padding: 0.3rem 0.6rem;
        background: ${props => props.theme.red};
        color: white;
        text-transform: uppercase;
        text-decoration: none;
    }
`;

const StyledHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    justify-items: center;
    align-items: center;
    .bar{
        justify-self: start;
    }
    .bill{
        justify-self: end;
        margin-right: 1rem;
    }
`;

const SubBar = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
`;

const Header = () => {
    return (
        <>
            <StyledHeader>
                <div className="bar">
                    <Nav />
                </div>
                <div>
                    <Logo>
                        <Link href="/">
                            <a>Billing Restro</a>
                        </Link>
                    </Logo>
                </div>
                <Bill />
            </StyledHeader>
            <SubBar>
                <Search />
            </SubBar>
        </>
    )
}

export default Header
