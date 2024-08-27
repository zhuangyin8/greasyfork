// ==UserScript==
// @name             磁力一键复制
// @homepage         https://greasyfork.org/zh-CN/scripts/495796
// @author           @zhuangyin8
// @version          2024.08.13
// @description      一键复制美化后的磁力
// @license          MIT
// @include          https://btsow.*/search/*
// @include          https://u9a9.*
// @include          https://btdig.com/*
// @include          https://sukebei.nyaa.si/*
// @include          https://zhongzidi.com/list*
// @grant            GM_setClipboard
// @grant            GM_addElement
// @grant            GM_addStyle
// @run-at           document-idle
// @downloadURL
// @updateURL
// @namespace *
// @downloadURL
// @updateURL
// @downloadURL https://update.greasyfork.org/scripts/495796
// @updateURL https://update.greasyfork.org/scripts/495796
// ==/UserScript==
(function () {
	"use strict";
	const addElement = (
		tagName = `button`,
		innerHTML = ``,
		options = {},
		parentNode = document.body
	) => {
		const el = document.createElement(tagName);
		el.innerHTML = innerHTML;
		Object.assign(el, options);
		parentNode.append(el);
	};
	const copyMagnet = (datalist, hash, title, size, date, magnet) => {
		document.querySelectorAll(datalist).forEach((element, index) => {
			const reg = /[a-fA-F\d]{40}/g;
			const link = `magnet:?xt=urn:btih:${element
				.querySelector(hash)
				.href.match(reg)[0]
				.toLowerCase()}&dn=${element.querySelector(title).innerText}🔞Size=${
				element.querySelector(size).innerText
			}🔞Date=${element.querySelector(date).innerText}`;
			element.querySelector(magnet).textContent = link;
			addElement(
				`button`,
				`点击复制第${index + 1}个磁力链接`,
				{
					/* className:"",*/
					onclick: (e) => {
						//GM_setClipboard(element.querySelector(hash).innerHTML , "html");
						GM_setClipboard(link, "text");
						e.target.textContent = `已复制第${index + 1}个磁力链接`;
						setTimeout(() => {
							e.target.textContent = `点击复制第${index + 1}个磁力链接`;
						}, 3000);
						e.target.style.cssText =
							"color: red; background-color: yellow; height: 100%";
						// e.target.setAttribute(
						// 	"style",
						// 	"color: red; background-color: yellow; height: 2em;"
						// );
					}
				},
				element /*document.getElementById("TM_translateButtons")*/
			);
		});
	};
	let host = location.host.split(".")[0];
	switch (host) {
		case "zhongzidi":
			copyMagnet(
				".row table",
				"tr h4 a",
				"tr h4 a",
				"tr:nth-child(2) td:nth-child(2) strong",
				"tr:nth-child(2) td:first-child strong",
				"tr h4 a"
			);
			break;
		case "btsow":
			copyMagnet(
				".data-list > .row:not(.hidden-xs)",
				"a",
				"a",
				".size",
				".date",
				"a div:first-child"
			);
			break;
		case "sukebei":
			copyMagnet(
				"tbody tr",
				"td:nth-child(3) a:last-child",
				"td:nth-child(2) a:not(:has(i))",
				"td:nth-child(4)",
				"td:nth-child(5)",
				"td:nth-child(2) a:last-child"
			);
			break;
		case "u9a9":
			copyMagnet(
				"tbody tr",
				"td:nth-child(3) a:last-child",
				"td:nth-child(2) a",
				"td:nth-child(4)",
				"td:nth-child(5)",
				"td:nth-child(2) a:last-child"
			);
			break;
		case "btdig":
			copyMagnet(
				".one_result > div",
				".torrent_name a",
				".torrent_name a",
				".torrent_size",
				".torrent_age",
				".torrent_magnet"
			);
			break;
		default:
	}
	/*GM_addStyle(`thead,.data-list .hidden-xs,tr .text-center,thead + tbody tr td:not(:nth-child(2)){ display: none !important;}
    .input-group {width:100%}
    .table-striped>tbody>tr:nth-of-type(odd) {background-color: rgb(213, 217, 237);}
    .torrent-list > tbody > tr > td{white-space: normal !important;}
    #article {max-width: 120ex !important;}
    .torrent_name {width: 980px !important;}
    body > center > div {max-width: 1500px !important;}`);*/
	GM_addStyle(`.torrent-list > tbody > tr > td {white-space: normal !important;}
    .tags-box { width: 100vw;position: fixed; top: 40px;}
    .data-list{ width: 100vw;position: absolute;top: 160px;}
    .hidden-xs:not(.tags-box,.text-right,.search,.search-container) { display: none !important;}
    .search,.search-container{}
    form .input-group{width: 100vw !important;top: 0 !important;left: 50px !important;position: fixed !important;z-index:99999;background:red}
    .container {width: 100vw;left: 360px;position: absolution;}
    .data-list .row {padding: 0; }`);
})();
