var inputBuilder = require('../inputBuilder/inputBuilder.js');
var schedulerBuilder = require('../scheduleBuilder/scheduleBuilder.js');

function buildAuthoringRelationGraph(papers){
	var authoringRelationGraph = [];
	papers.forEach(function(paper){
		var authors = paper.authors;
		var authorPartnerList = [];
		authors.forEach(function(author){
		authorPartnerList = getAuthorPartnerList(author, authoringRelationGraph)|| [] ;
			authors.forEach(function(authorPartner){
				if (!areEqual(author,authorPartner)){
					authorPartnerList.push(authorPartner);
				}
			})
			authoringRelationGraph.push([author, authorPartnerList]);
		})
	});
	return authoringRelationGraph;
};

