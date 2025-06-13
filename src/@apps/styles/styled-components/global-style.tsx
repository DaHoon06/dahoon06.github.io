import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    a {
        cursor: pointer;
        text-decoration: none;
    }


    /* http://meyerweb.com/eric/tools/css/reset/ 
     v2.0 | 20110126
     License: none (public domain)
  */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        font-family:  "Pretendard", "NanumSquare", "Nanum Gothic", sans-serif, "Noto Serif KR", serif, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    }

    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    

    html {
        min-width: 320px;
    }
    
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      background-color: #2d2d2d;
    }
    
    #__next {
      min-height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      background-color: #2d2d2d;
    }

    html, body {
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      box-sizing: border-box;

      &::-webkit-scrollbar {
        width: 12px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 8px;
        border: 1px solid #f1f1f1;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      @media screen and (max-width: 769px) {
        &::-webkit-scrollbar {
          width: 0;
        }

        @supports (-webkit-touch-callout: none) {
          height: -webkit-fill-available;
        }
      }
    }

    body {
        transition: background 0.2s ease-in, color 0.2s ease-in;
        width: 100%;
        padding: 0;
        color: #fff;
      background-color: #2d2d2d;
    }

    #root {
        width: 100%;
    }

    ol, ul {
        list-style: none;
    }

    blockquote, q {
        quotes: none;
    }

    button {
        cursor: pointer;
        background: none;
        border: none;
        outline: none;
    }

    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    select {
        appearance:none;
        border: 1px solid #999999;
        background-color: #ffffff;
    }

    input[type=text] {
        border: 1px solid #999999;
        background-color: #ffffff;
    }
    input[type=checkbox] {
        accent-color: #222;
    }

    :root {
        // COLOR
        --error: #e74c3c;

        --backgroundColor1: #f3f5f8;
        //BOARDER
        --borderColor1: #ededed;
        --borderColor2: #DCDEE0;
        // TEXT
        --textDefault: #222;
        --textWhite: #fff;
        --textBlack000: #1C2434;
        --textBlack100: #444548;
        --textBlack200: #5E5E5E;
        --textGray000: #494949;
        --textGray100: #a1a1a1;
        --textGray200: #afafaf;
        --textGray250: #999999;
        --textGray300: #666666;
        --textGray400: #333333;
        
        --textBlue000: #3174BA;
        --textBlue100: #181FD3;
        
        --textRed000: #FD4E15FF;
        --textRed100: #ff6666;
        --textRed300: #ffa5a5;


        --primary: #000;

        --white000: #fff;
        --white100: #f6f6f6;
        --white200: #e5e5e5;
        --white300: #dadada;

        --black000: #000;
        --black100: #2f2f2f;
        --black200: #333333;
        --black400: #5D5D5D;

        --purple000:  #8869EA;
        --purple300: #e9e2ff;

        --gray000: #A6A6A6;
        --gray050: #ccc;
        --gray100: #CFCFCF;
        --gray200: #DDDDDD;
        --gray250: #eee;
        --gray350: #464F60;
        
        --blue000: #3174BA;
    }


    html, body, body[data-theme="light"] {
        --error: #e74c3c;

        --backgroundColor1: #f3f5f8;
        //BOARDER
        --borderColor1: #ededed;
        --borderColor2: #DCDEE0;
        // TEXT
        --textDefault: #222;
        --textWhite: #fff;
        --textBlack000: #1C2434;
        --textBlack100: #444548;
        --textBlack200: #565656;
        --textGray000: #494949;
        --textGray100: #a1a1a1;
        --textGray200: #adadad;

        --textRed000: #FD4E15FF;

        --primary: #000;
        --second: #CB03CD;

        --white000: #fff;
        --white100: #f6f6f6;
        --white200: #e5e5e5;
        --white300: #dadada;

        --black000: #000;
        --black100: #2f2f2f;
        --black200: #333333;
        --black400: #5D5D5D;

        --purple000:  #8869EA;

        --gray000: #A6A6A6;
        --gray050: #ccc;
        --gray100: #CFCFCF;
        --gray200: #DDDDDD;
        --gray250: #eee;
        --gray300: #464F60
    }

    body[data-theme="dark"] {
    }
`;
