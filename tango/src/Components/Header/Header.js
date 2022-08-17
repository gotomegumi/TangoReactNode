import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Header({ themeToggler }) {
    const changeTheme = () => {
        themeToggler()
    }

  return (
    <Head className="light-theme">
        <Header_title>
            <TitleLink to={'/'}>TANGO</TitleLink>

        </Header_title>
        
        <label className="light-theme">
            {/* <Check id="btn-mode" type="checkbox"></Check>  */}
            <div onClick={() => {changeTheme()}}>label</div>
            <div className="darkmode-icon"></div>
        </label>
        <Nav_bar>
            <li className="nav-link"><a href="/section1/test">section1</a></li>
            <li className="nav-link"><a href="#">acount</a></li>
            <li className="nav-link"><a href="#">progress</a></li>
        </Nav_bar>
        <div className="nav-btn-wrap">
            <div className="nav-btn light-theme">
                <span></span>
            </div>
        </div>
    </Head>
  )
}

const Head = styled.header`
    background-color: ${({theme})=>theme.header_color};
    border-bottom: white solid 1px;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top:0;
    left: 0;
    width: 100%;

`

const Header_title = styled.div`
    line-height: 100px;
    margin-left: 40px;
    color: rgb(255, 169, 47);
`

const TitleLink = styled(Link)`
    font-size: 35px;
    color: #ff9a2e;
    text-decoration: none;
    font-weight: 550;
`

const Nav_bar = styled.div`
    display: flex;
    line-height: 100px;
    margin-left: auto;
    display: none;

`


export default Header