function set_random_source(probID) {
  var seed = Math.floor(Math.random() * 10000000000);
  set_source(probID, seed);
}

function set_source(probID, seed) {
  var prob = document.querySelector('wwproblem[probID="' + probID + '"]');
  var fr = prob.querySelector('iframe[probFrameID="embeded-window-' + probID + '"]');
  fr.src = prob.getAttribute('path') + seed;
}

var problems = document.getElementsByTagName('wwproblem');
for (var i = 0; i < problems.length; i++) {
  var prob = problems[i];

  var width = prob.getAttribute('width');
  var height = prob.getAttribute('height');
  var seed = prob.getAttribute('seed');
  var path = prob.getAttribute('path');

  prob.setAttribute("probID", i);
  var probID = prob.getAttribute('probid');

  // heading
  var h2 = document.createElement('h2');
  h2.style = "margin-top: 50px;	margin-bottom: 5px;"
  var title = prob.title == null ? "Problem " + probID : prob.title;
  h2.appendChild(document.createTextNode(title));
  prob.appendChild(h2);

  // randomize button
  var rand = document.createElement('button');
  rand.style = "margin: 0px 10px 10px 0px;";
  rand.appendChild(document.createTextNode('Randomize'));
  rand.setAttribute('onclick', 'set_random_source("' + probID + '")');
  prob.appendChild(rand);

  // reset button
  var res = document.createElement('button');
  res.style = "margin: 0px 10px 10px 0px;";
  res.appendChild(document.createTextNode('Reset'));
  var seed = seed == null ? 123456789 : seed;
  res.setAttribute('onclick', 'set_source("' + probID + '", "' + seed + '")');
  prob.appendChild(res);

  prob.append(document.createElement('br'));

  // iframe
  var fr = document.createElement('iframe');
  fr.width =  width == null ? "100%" : width;
  fr.height = height == null ? 500: height;
  fr.setAttribute('probFrameID', "embeded-window-" + probID);
  fr.src = path + seed;
  prob.appendChild(fr);

}
