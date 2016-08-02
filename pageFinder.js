//////////////////////////////////////////////////////////////
//        This Script was made by Piggah Bro Studios        //
//////////////////////////////////////////////////////////////
//         Please only change or modify this script         //
//                if you know how it is ran!                //
//////////////////////////////////////////////////////////////
//                  DESCRIPTION / HOW TO USE                //
// -------------------------------------------------------- //
// To use this script, add <page></page> tags in your HTML  //
// page and make the id's of these tags to the page you     //
// want to make it. for example:                            //
//                                                          //
// <page id='Home'>                                         //
//   Content goes here!                                     //
// </page>                                                  //
//                                                          //
// Now go to yourwebsite.com/#Home and the page will show   //
// up! Keep adding pages like so and let the script do the  //
// rest!                                                    //
//                                                          //
// The one thing that you can play around with in this      //
// script is the PBS.pageFinder.start, change this to the   //
// id of the page you want to show up when people go to     //
// yourwebsite.com. When they got to yourwebsite.com, it    //
// will redirect them to yourwebsite.com/#Home, or whatever //
// the PBS.pageFinder.start is set to!                      //
//                                                          //
// NOTE: You do not need to use the <page> tag, we use it   //
//       to keep our HTML looking nice :P                   //
//////////////////////////////////////////////////////////////

var PBS.pageFinder = {
  start: 'Home',
  current: 'Home',
  update: function () {
    //Check to see if the hash is the same as what is PBS.pageFinder.current
    
    if(window.location.hash.slice(1,window.location.hash.length) !== PBS.pageFinder.current){
      document.getElementById(PBS.pageFinder.current).style.display = "none";
      page.current = window.location.hash.slice(1,window.location.hash.length);
      document.getElementById(PBS.pageFinder.current).style.display = "block";
    }
    
    requestAnimationFrame(PBS.pageFinder.update);
  }
};

if (window.location.hash === ''){
  window.location.hash = '#' + PBS.pageFinder.start;
  document.getElementById(PBS.pageFinder.start).style.display = "block";
} else {
  document.getElementById(PBS.pageFinder.start).style.display = "block";
}

PBS.pageFinder.update();
