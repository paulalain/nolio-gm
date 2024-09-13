// ==UserScript==
// @name         Nolio 3 Zones
// @namespace    https://www.nolio.io/
// @version      2024-09-13
// @description  Update the 7 zones to 3 zones
// @author       Paul-Alain Bugnard
// @match        https://www.nolio.io/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        GM_download
// ==/UserScript==

// ==UserScript==
// @name         Nolio 3 Zones
// @namespace    https://www.nolio.io/
// @version      2024-09-13
// @description  try to take over the world!
// @author       You
// @match        https://www.nolio.io/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==


window.addEventListener('scroll', event => {
    let charts = Highcharts.charts;

    for (let i in charts) {
        if (charts[i].options && charts[i].options.title && charts[i].options.title.text && charts[i].options.title.text === "Durée par zones allure") {
            let zoneChart = charts[i];
            let options = zoneChart.options;
            const divContainer = zoneChart.container;
            const data = zoneChart.series[0].data;

            // Group Active Recovery & Easy (0 & 1)
            let zone1 = data[0].y + data[1].y;

            // Group 2 & 3
            let zone2 = data[2].y + data[3].y;

            // Group 3 & 4 & 5
            let zone3 = data[4].y + data[5].y + data[6].y;

            let newData = [{
                y: zone1,
                color: "#11a9ed",
                name: "Zone 1",
                name_annotated: "Zone 1"
            },{
                y: zone2,
                color: "#72ea24",
                name: "Zone 2",
                name_annotated: "Zone 2"
            },{
                y: zone3,
                color: "#ffd600",
                name: "Zone 3",
                name_annotated: "Zone 3"
            }];

            options.plotOptions.series = {
                borderRadius: 5,
                dataLabels: [{
                    enabled: true,
                    distance: 15,
                    format: '{point.name}<br />{point.percentage:.0f}%',
                }]
            };

            options.series[0].data = newData;
            charts[i].options.title.text = "Durée par 3 zones allure";

            Highcharts.chart(divContainer, options);
            break;
        }
    }
}, true);
