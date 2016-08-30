# Module: MMM-Rest
The `MMM-Rest` module is a <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a> addon.
This module collects data via AJAX / REST calls and displays it on your Mirror

TODO
![Rest Displays](https://cloud.githubusercontent.com/assets/19363185/17138689/754130ba-530f-11e6-855a-d3c3142f36eb.png)


## Known Issues
none so far

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
                    suffix: '°C',
                    digits: 1,
                    url: 'http://www.dirk-melchers.de/echo.php?text=22.54',
                },
                {
                    suffix: '%',
                    digits: 1,
                    url: 'http://www.dirk-melchers.de/echo.php?text=59.1',
                },
                {
                    suffix: '°C',
                    digits: 1,
                    url: 'http://www.dirk-melchers.de/echo.php?text=23.10',
                },
                {
                    suffix: '%',
                    digits: 1,
                    url: 'http://www.dirk-melchers.de/echo.php?text=62.1',
                },
                {
                    suffix: '°C',
                    digits: 1,
                    url: 'http://www.dirk-melchers.de/echo.php?text=-19.73',
                },
            ],
            output: [
                ['Wohnzimmer','@1','@2'],
                ['Küche','@3','@4'],
                ['TK','@5'],
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
			<td><code>sections</code></td>
			<td>TODO</td>
		</tr>
		<tr>
			<td><code>output</code></td>
			<td>TODO</td>
		</tr>
		<tr>
			<td><code>updateInterval</code></td>
			<td>How often this refreshes<br>
				<br><b>Example:</b> <code>60000</code>
				<br><b>Default value:</b> <code>60000</code>
			</td>
		</tr>
	</tbody>
</table>
