/**
 * Implements cookie-less JavaScript session variables
 * v1.0
 *
 * By Craig Buckler, Optimalworks.net
 *
 * As featured on SitePoint.com
 * Please use as you wish at your own risk.
*
 * Usage:
 *
 * // store a session value/object
 * Session.set(name, object);
 *
 * // retreive a session value/object
 * Session.get(name);
 *
 * // clear all session data
 * Session.clear();
 *
 * // dump session data
 * Session.dump();
 *
 * // replace the complete window.top.name content.
 * // This function should be used very carefully.
 * Session.load(content);
 *
 */

 if (JSON && JSON.stringify && JSON.parse) var Session = Session || (function() {

	// window object
	var win = window.top || window;

	// session store
    try{
        var store = (win.name ? JSON.parse(win.name) : {});
    } catch (e) {
        var store = {};
    }
	// save store on page unload
	function Save() {
		win.name = JSON.stringify(store);
	};

	// page unload event
	if (window.addEventListener) window.addEventListener("unload", Save, false);
	else if (window.attachEvent) window.attachEvent("onunload", Save);
	else window.onunload = Save;

	// public methods
	return {

		// set a session variable
		set: function(name, value) {
			store[name] = value;
		},

		// get a session value
		get: function(name) {
			return (store[name] ? store[name] : undefined);
		},

		// clear session
		clear: function() { store = {}; },

		// dump session data
		dump: function() { return JSON.stringify(store); },
        
        //load content string to session data
        load: function(content){
            // session store
            try{
                store = (content ? JSON.parse(content) : {});
                win.name = JSON.stringify(store);
            } catch (e) {
                store = {};
            }
        }
   };
 })();