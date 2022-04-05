// ==UserScript==
// @name         Branch Name Helper
// @namespace    https://dev.azure.com/
// @version      0.1
// @description  Remove spaces when creating a branch and replace with -
// @author       You
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    console.log('Window init greasemonkey')

    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
    //
    waitForElm('.vc-create-branch-from-git-ref-dialog > .form-section > input').then((elm) => {
        elm.addEventListener('keyup', (event) => {
            elm.value = elm.value.replace(/\s/g, '-');
        });
    });
})();