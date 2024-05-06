# Module: MMM-Rest

The `MMM-Rest` module is a [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror) addon.
This module collects data via HTTP calls and displays it on your mirror in a table.

![Rest Displays](screenshot.png)

## Installation

1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/Tuxdiver/MMM-Rest`
2. cd `cd MMM-Rest`
3. Execute `npm install` to install the node dependencies.

## Changelog

- 2016-10-27: incompatible changes: the "suffix" and "digits" parameters are removed and replaced by a "format" parameter! Please check your config!
- 2018-02-02: added ranges to format parameter
- 2024-03-21: added the ability to place multiple instances of the module into config files
- 2024-03-22: Added the ability to specify and customize display of DateTime objects
- 2024-03-22: Added the ability to transform REST results before displaying
- 2024-05-06: Added new optional variable `forceAlign` for more customizable alignment 

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

````javascript
modules: [
    {
        module: 'MMM-Rest',
        position: 'bottom_right',    // This can be any of the regions.
                                     // Best results in one of the side regions like: top_left
        config: {
                debug: false,
		forceAlign: false,
		mappings: {
                    on_off: {
                        true: 'on',
                        false: 'off',
                    },
                    temperature: {
                        1: 'cold',
                        2: 'warm',
                        3: 'HOT',
                    },
                },
                sections: [
                {
                    format: '%.1f<span class="wi wi-celsius"></span>',
                    url: 'https://www.dirk-melchers.de/echo.php?text=22.54',
                },
                {
                    format: [
                        { range: [, 10], format: '<span style="color:green">%d</span>'},
                        { range: [10, 20], format: '<span style="color:yellow">%d</span>'},
                        { range: [30, ], format: '<span style="color:red">%d</span>'},
                        { string: 'HOT', format: '<span style="color:red">%d</span>'},
                        { format: '%d'}
                    ],
                    url: 'https://www.dirk-melchers.de/echo.php?text=59.1',
                },
                {
                    format: '%s',
                    mapping: 'temperature',
                    url: 'https://www.dirk-melchers.de/echo.php?text=2',
                },
                {
                    format: '%d<span class="wi wi-humidity"></span>',
                    url: 'https://www.dirk-melchers.de/echo.php?text=62.1',
                },
                {
                    format: 'Lights %s',
                    mapping: 'on_off',
                    url: 'https://www.dirk-melchers.de/echo.php?text=true',
                },
		{
                    format: [
                        { dateOptions: { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }, format: '<span style="color:green">%s</span>'},
                    ],
                    url: 'https://www.dirk-melchers.de/echo.php?text=2024-03-22T00:11:05.000+0000',
                },
                {
                    format: [
                        { range: [, 1000], format: '<span style="color:green">%d W</span>'},
                        { range: [1000, 1000000], format: '%.1f kW', transform: 'value/1000'}
                        { format: '%.1f MW', transform: 'value/1000000'}
                    ],
                    url: 'https://www.dirk-melchers.de/echo.php?text=10005',
                },
            ],
            output: [
                ['Livingroom','@1','@2'],
                ['Kitchen','@3','@4'],
                ['Fridge','@5'],
                ['Last Updated','@6'],
                ['Solar Production','@7'],
            ],
        },
    }
]
````

## Configuration options

The following properties can be configured:
Option|Description
------		|-----------
`sections`	| `sections` is an array of hashes for the REST endpoints to connect to<br><br>__Option__<br><br>`format`:<br>If it is a string: sprintf() format<br>Could also be an array of hashes. The array is processed from top to bottom and first match wins. The last entry could be a default without "range". Leaving one value of the range empty means "ignore this bound".<br>You could use "string" instead of "range" to match the value against the parameter of the string.<br>

<table width="100%">
    <!-- why, markdown... -->
    <thead>
        <tr>
            <th>Option</th>
            <th width="100%">Description</th>
        </tr>
    <thead>
    <tbody>
        <tr>
            <td valign="top"><code>sections</code></td>
            <td>sections is an array of hashes for the REST endpoints to connect to<br>
            <table>
                <thead>
                    <tr>
                        <th>Option</th>
                        <th width="100%">Description</th>
                    </tr>
                <thead>
                <tbody>
                    <tr>
                        <td valign="top"><code>format</code></td>
                        <td>If it is a string: sprintf() format<br>
                        Could also be an array of hashes. The array is processed from top to bottom and first match wins. The last entry could be a default without "range". Leaving one value of the range empty means "ignore this bound".<br>
                        You could use "string" instead of "range" to match the value against the parameter of the string.<br>
			Finally, you could use "dateOptions" instead of "range" or "string" to specify that the expected value is an ISO 8601 DateTime object (may work for other date formats as well, as long as the javascript function `new Date()` takes that format), and describe what format you want the date displayed in.  Formatting options described here https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript. <br> 
			You may also add a `transform` function to convert the value before displaying it.  Use a string that is a common mathematical function with the value of the raw REST data is `value`.  E.g., `value/1000` will divide the raw value by 1000 before displaying.  Useful for converting units.  Note:  transform happens _after_ any range is matched.
                        </td>
                    </tr>
                    <tr>
                        <td valign="top"><code>mapping</code></td>
                        <td>Map the value againt a defined mapping</td>
                    </tr>
                    <tr>
                        <td valign="top"><code>url</code></td>
                        <td>The url to call. It has to return a single integer / floating point value</td>
                    </tr>
                </tbody>
            </table>
            </td>
        </tr>
        <tr>
            <td valign="top"><code>mappings</code></td>
            <td>mappings is an hash of hashes for the mapping of values to other values<br>
            <table>
                <thead>
                    <tr>
                        <th>Option</th>
                        <th width="100%">Description</th>
                    </tr>
                <thead>
                <tbody>
                    <tr>
                        <td valign="top"><code>NAME_OF_MAPPING</code></td>
                        <td>Name of mapping will be referenced by sections -> mapping</td>
                    </tr>
                    <tr>
                        <td valign="top"><code>values</code></td>
                        <td>hash of key / values to map from / to</td>
                    </tr>
                </tbody>
            </table>
            </td>
        </tr>
        <tr>
            <td valign="top"><code>output</code></td>
            <td>control the output table for the display.
            Has to be a 2-dimensional array representing the rows and the columns of the output<br>
            A cell containing a '@' followed by a number represents the section id (starting by 1) of the REST Urls
            </td>
        </tr>
        <tr>
            <td valign="top"><code>updateInterval</code></td>
            <td>How often this refreshes<br>
                <br><b>Example:</b> <code>60000</code>
                <br><b>Default value:</b> <code>60000</code>
            </td>
        </tr>
        <tr>
            <td valign="top"><code>initialLoadDelay</code></td>
            <td>How long to wait for the first load<br>
                <br><b>Example:</b> <code>60000</code>
                <br><b>Default value:</b> <code>0</code>
            </td>
        </tr>
        <tr>
            <td valign="top"><code>animationSpeed</code></td>
            <td>Fadeover effect for dom updates<br>
                <br><b>Example:</b> <code>1000</code>
                <br><b>Default value:</b> <code>2000</code>
            </td>
        </tr>
        <tr>
            <td valign="top"><code>debug</code></td>
            <td>Log messages to Log.info / console<br>
                <br><b>Example:</b> <code>true</code>
                <br><b>Default value:</b> <code>false</code>
            </td>
        </tr>
    </tbody>
</table>
