//////////////////////////////////////////////////////////////
//        This Script was made by Piggah Bro Studios        //
//////////////////////////////////////////////////////////////
//         Please only change or modify this script         //
//                if you know how it is ran!                //
//////////////////////////////////////////////////////////////
//                 DESCRIPTION / HOW TO USE                 //
// -------------------------------------------------------- //
// To use this script, add <page></page> tags in your HTML  //
// page and make the id's of these tags to the page you     //
// want to make it. for example:                            //
//                                                          //
// <page id='/Home'>                                         //
//   Content goes here!                                     //
// </page>                                                  //
//                                                          //
// Now go to yourwebsite.com/#/Home and the page will show  //
// up! Keep adding pages like so and let the script do the  //
// rest!                                                    //
//                                                          //
// The one thing that you can play around with in this      //
// script is PBS.settings.page. Change anything in this     //
// section to fit your websites' needs.                     //
//                                                          //
// Here is an explaination of what each of the settings do: //
//    blocked:  is an arrary of blocked pages               //
//    start:    the page your website starts on             //
//    autoRun:  tells the script if you want finder to run  //
//    error:    the pages you set for errors                //
//                                                          //
// Now if you set the start page to '/Home' and autoRun to  //
// true, then when you load up yourwebsite.com, it will     //
// automatically redirect you to yourwebsite.com/#/Home, or //
// whatever the PBS.pageFinder.start is set to!             //
//                                                          //
// NOTE: You do not need to use the <page> tag, we use it   //
//       to keep our HTML looking nice :P                   //
//////////////////////////////////////////////////////////////

var PBS = {
  page: {
    current: '',
    finder: function() {
      if(window.location.hash.slice(1,window.location.hash.length) !== PBS.page.current){
        document.getElementById(PBS.page.current).style.display = "none";
        PBS.page.current = window.location.hash.slice(1,window.location.hash.length).toString();
        if (document.getElementById(PBS.page.current)) {
          document.getElementById(PBS.page.current).style.display = 'block';
        } else {
          document.getElementById(PBS.settings.page.error['404']).style.display = 'block';
        }
      }
    },
    generate: function(file) {
      
    }
  },
  settings: {
    page: {
      blocked: [],
      start: '/Home',
      autoRun: false,
      error: { // Add more if you wish
        '400': '', // Bad Request
        '401': '', // Unauthorized
        '403': '', // Forbidden Page
        '404': ''  // Not Found
      }
    }
  },
  toUpdate: [],
  update: function() {
    for ( i = 0; i < PBS.toUpdate.length; i++ ) {
      PBS.toUpdate[i]();
    }
    
    requestAnimationFrame(PBS.update);
  },
  initialize: function(){
    if ( PBS.settings.page.autoRun === true ) {
      if (window.location.hash === ''){
        window.location.hash = '#' + PBS.settings.page.start;
        document.getElementById(PBS.settings.page.start).style.display = "block";
        PBS.page.current = PBS.settings.page.start;
      } else {
        document.getElementById(window.location.hash.slice(1,window.location.hash.length)).style.display = "block";
        PBS.page.current = window.location.hash.slice(1,window.location.hash.length).toString();
      }
      PBS.toUpdate.push(PBS.page.finder);
    }
    PBS.update();
  },
  cookie: {
    set: function setCookie(name,value,days) {
      var d = new Date();
      d.setTime(d.getTime() + (days*24*60*60*1000));
      var expires = "expires=" + d.toGMTString();
      document.cookie = name + "=" + value + "; " + expires;
    },
    setList: function setListOfCookies(list, log) { /** [{name: '', value: '', days: 30}, {...}]*/
      for ( i = 0; i < list.length; i++ ) {
        PBS.cookie.set(list[i].name, list[i].value, list[i].days);
        if ( log && log === true ) {
          console.log('Cookie "' + list[i].name + '" was created!');
        }
      }
    },
    get: function getCookie(name) {
      var name = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    getList: function getCookie(list) {
      this.cookieList = {};
      for ( i = 0; i < list.length; i++ ) {
        this.cookieList[list[i]] = PBS.cookie.get(list[i]);
      }
      return this.cookieList;
    },
    check: function checkCookie(name, set) {
      var user = PBS.cookie.get(name);
      if (user === "") {
        if (set) {
          PBS.cookie.set(set.name, set.value, set.days);
          console.log("The " + name + " cookie has been set!");
        } else {
          console.error(name + " is not a cookie!");
        }
      }
    },
    delete: function deleteCookie(name) {
    	PBS.cookie.set(name, "", -1);
    },
    deleteList: function(list){
      for ( i = 0; i < list.length; i++ ) {
        PBS.cookie.delete(list[i]);
      }
    },
    print: function printCookie(name) {
      console.log(PBS.cookie.get(name));
    }
  }
};

PBS.initialize();
