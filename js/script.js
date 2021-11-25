username = 'robsd'; // GitHub Profile Username
theme = 'dark' // Either 'light' or 'dark'

favicon = document.getElementById('favicon');
profileLayout = document.getElementById('profile');
repoLayout = document.getElementById('repos');

themePrimary = 'bg-white';
themeSecondary = 'bg-light';
themeText = 'text-dark';

if (theme == 'dark') {
	themePrimary = 'bg-dark';
	themeSecondary = 'bg-secondary';
	themeText = 'text-light';
}

document.body.className = themePrimary + ' ' + themeText;

apiCall('https://api.github.com/users/' + username, getProfile);
apiCall('https://api.github.com/users/' + username + '/repos', getRepos);

function apiCall(url, callback) {
	request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			data = JSON.parse(this.responseText);
			callback(data);
		}
	}
	request.open('GET', url);
	request.send();
}

function getProfile(profile) {
	favicon.href = profile['avatar_url'];

	formatProfileLayout = '<div class="mb-5">';
	formatProfileLayout += '<img class="img-fluid rounded-circle mb-3" src="' + profile['avatar_url'] + '" width="200" alt="@' + profile['login'] + '"></img>';
	if (profile['name'] != null) {
		document.title = profile['name'];
		formatProfileLayout += '<h1>' + profile['name'] + '</h1>';
	}
	else {
		document.title = '@' + profile['login'];
	}
	formatProfileLayout += '<p class="lead">@' + profile['login'] + '</p>';
	if (profile['hireable'] != null) {
		formatProfileLayout += '<p><span class="badge bg-success">AVAILABLE FOR HIRE</p>';
	}
	if (profile['bio'] != null) {
		formatProfileLayout += '<p>' + profile['bio'] + '</p>';
	}
	formatProfileLayout += '</div>';
	if (profile['company'] != null) {
		formatProfileLayout += '<p><i class="fas fa-building"></i> ' + profile['company'] + '</p>';
	}
	if (profile['location'] != null) {
		formatProfileLayout += '<p><i class="fas fa-map-marker-alt"></i> ' + profile['location'] + '</p>';
	}
	formatProfileLayout += '<p><i class="fab fa-github"></i> <a href="https://github.com/' + profile['login'] + '"> @' + profile['login'] + '</a></p>';
	if (profile['twitter_username'] != null) {
		formatProfileLayout += '<p><i class="fab fa-twitter"></i> <a href="https://twitter.com/' + profile['twitter_username'] + '">@' + profile['twitter_username'] + '</a></p>';
	}
	if (profile['blog'] != '') {
		websiteLink = profile['blog'];
		if (profile['blog'].indexOf('http://') != 0 && profile['blog'].indexOf('https://') != 0) {
			websiteLink = 'http://' + profile['blog'];
		}
		formatProfileLayout += '<p><i class="fas fa-link"></i> <a href="' + websiteLink + '">' + profile['blog'] + '</a></p>';
	}
	profileLayout.innerHTML = formatProfileLayout;
}

function getRepos(repos) {
	if (repos && repos.length > 0) {
		formatRepoLayout = '<div class="row">';
		for (i = 0; i < repos.length; i++) {
			formatRepoLayout += '<div class="col-md-4 mb-4">';
			formatRepoLayout += '<div class="card ' + themeSecondary + ' h-100">';
			formatRepoLayout += '<h5 class="card-header">'+ repos[i]['name'] + '</h5>';
			formatRepoLayout += '<div class="card-body ' + themePrimary + '">';
			if (repos[i]['description'] != null) {
				formatRepoLayout += '<p>' + repos[i]['description'] + '</p>';
			}
			formatRepoLayout += '</div>';
			formatRepoLayout += '<div class="card-footer"><i class="fas fa-star"></i> ' + repos[i]['stargazers_count'] + ' <i class="fas fa-code-branch ms-3"></i> ' + repos[i]['forks'] + '</div>';
			formatRepoLayout += '<a class="stretched-link" href="' + repos[i]['html_url'] + '"></a>';
			formatRepoLayout += '</div></div>';
		}
		formatRepoLayout += '</div>';
		repoLayout.innerHTML = formatRepoLayout;
	}
}