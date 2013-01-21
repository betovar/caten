exports.rand = function(fmt, len) {
  if (fmt == 'dec') {
		return Math.floor(Math.random()*Math.pow(10,len));
	} else {
		return 'bdd81dc887d84899cf3b';
	}
}