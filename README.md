# Module: MMM-Rest
The `MMM-Rest` module is a <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a> addon.
This module collects data via HTTP calls and displays it on your mirror in a table.

![Rest Displays](https://raw.githubusercontent.com/wiki/Tuxdiver/MMM-Rest/images/screenshot.png)


## Known Issues
- had a problem with remote URLs an AJAX: changed to node_helper.js to collect data

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-Rest',
		position: 'bottom_right',	// This can be any of the regions.
									// Best results in one of the side regions like: top_left
        config: {
            sections: [
                {
                    suffix: '<span class="wi wi-celsius"></span>',
                    digits: 1,
                    url: 'https://www.dirk-melchers.de/echo.php?text=22.54',
                },
                {
                    suffix: '%',
                    digits: 1,
                    url: 'https://www.dirk-melchers.de/echo.php?text=59.1',
                },
                {
                    suffix: '<span class="wi wi-celsius"></span>',
                    digits: 1,
                    url: 'https://www.dirk-melchers.de/echo.php?text=23.10',
                },
                {
                    suffix: '%',
                    digits: 1,
                    url: 'https://www.dirk-melchers.de/echo.php?text=62.1',
                },
                {
                    suffix: '<span class="wi wi-celsius"></span>',
                    digits: 1,
                    url: 'https://www.dirk-melchers.de/echo.php?text=-19.73',
                },
            ],
            output: [
                ['Livingroom','@1','@2'],
                ['Kitchen','@3','@4'],
                ['Fridge','@5'],
            ],
	}
]
````

## Configuration options

The following properties can be configured:

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
                        <td valign="top"><code>suffix</code></td>
                        <td>suffix to append to value from REST-Call</td>
                    </tr>
                    <tr>
                        <td valign="top"><code>digits</code></td>
                        <td>Number of digits of the value</td>
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
