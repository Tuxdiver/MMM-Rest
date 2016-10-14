/* global Module */

/* Magic Mirror
 * Module: MMM-Rest
 *
 * By Dirk Melchers
 * MIT Licensed.
 */

Module.register("MMM-Rest",{

	// Default module config.
	defaults: {
        debug: false,
        updateInterval: 60 * 1000, 
		animationSpeed: 2 * 1000,
		initialLoadDelay: 0,
        sections: [
                    {
                        suffix: '',
                        digits: 0,
                        url: 'http://www.dirk-melchers.de/echo.php?text=42',
                    },  
        ],
        output: [
            ['The answer','@1']
        ],

	},
	// Define required scripts.
	getStyles: function() {
		return ["MMM-Rest.css"];
	},

    debugmsg: function(msg) {
        if (this.config.debug) {
            Log.info(msg);
        }
    },
    
	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
        
		this.debugVar = "";

		this.sections = this.config.sections;
        
		this.loaded = false;
		this.scheduleUpdate(this.config.initialLoadDelay);

		this.updateTimer = null;
        
        // store the REST results here
        this.sectionData = [];
	},

	// Override dom generator.
	getDom: function() {
        var self = this;

        this.debugmsg('MMM-Rest: getDom');
        
        // create wrapper <div>
		var wrapper = document.createElement("div");
        
        // debug messages
        if (this.debugVar !== "") {
			wrapper.innerHTML = self.debugVar;
			wrapper.className = "dimmed light xsmall";
			return wrapper;
		}

        // Loading message
		if (!this.loaded) {
			wrapper.innerHTML = "MMM-Rest Loading...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}
        
        // create table
        var tableHTML=document.createElement("table");
        tableHTML.className="small";
        
        // loop over all output rows
        for (var row_id in self.config.output) {
            this.debugmsg('MMM-Rest: getDom row='+row_id);
            
            var row = self.config.output[row_id];
            
            // create <tr>
            var tr = document.createElement("tr");
            tableHTML.appendChild(tr);

            // loop over all columns in this row
            for (var col_id in row) {
                var col = row[col_id];
                var td = document.createElement("td");

                // does the col match @[0-9]+?
                var data_ids = col.match(/^@(\d+)$/);

                // we have a regexp match - so don't show the col, but the sectionData in the right format
                if (data_ids !== null) {
                    var section_id = (data_ids[1])-1;
                    col_text = parseFloat(self.sectionData[section_id]).toFixed(self.sections[section_id].digits) + self.sections[section_id].suffix;
                    td.className="align-right";
                } else {
                    col_text = col;
                    td.className="align-left";
                }

                // set content and append to row
    		    td.innerHTML=col_text;
                tr.appendChild(td);
            }            
        }
        
        // append table to wrapper
        wrapper.appendChild(tableHTML);
        
		return wrapper;
	},


	getData: function() {

        var self = this;
        this.debugmsg('MMM-Rest: getData');
        
        // loop over all sections
        for (var id in self.sections) {
            var section = self.sections[id];
            this.debugmsg('MMM-Rest: getData section id: '+id);

            this.sendSocketNotification(
                'MMM_REST_REQUEST',
                {
                    id: id,
                    url: section.url
                }
            );
        }
        
        self.scheduleUpdate(self.updateInterval);
	},

    processResult: function(id, data) {

        // store the data in the sectionData array       
        this.sectionData[id] = data;
        
        this.debugmsg('MMM-Rest: Process result section: ' + id);
        
		this.loaded = true;
		this.debugVar = "";
        
		this.updateDom(this.config.animationSpeed);
	},
    
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'MMM_REST_RESPONSE' ) {
            this.debugmsg('received:' + notification);
            if(payload.data && payload.data.statusCode === 200){
                this.debugmsg("process result:"+payload.id+" data:"+payload.data.body);
                this.processResult(payload.id, payload.data.body);
            }
        }
    },
    



	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		setTimeout(function() {
			self.getData();
		}, nextLoad);
        
	},



});
