#include <bits/stdc++.h>
using namespace std;

#define pb push_back
#define mp make_pair
#define all(x) begin(x), end(x)

typedef long long ll;

int main() {
	cin.tie(0)->sync_with_stdio(0);

	string s;
	vector<pair<ll,ll>> r,f;
	while(cin >> s) {
		if(s.empty()) break;
		int i = s.find("-");
		if(string::npos == i) break;
		ll start = stoll(s.substr(0,i));
		ll end = stoll(s.substr(i+1));
		r.pb(mp(start,end));
	}

	sort(all(r), [](pair<ll,ll> a, pair<ll,ll> b){ return a.first < b.first; });

	ll n,part1 = 0;
	while(cin >> n) {
		for(auto range : r) {
			if(n >= range.first && n <= range.second) {
				++part1;
				break;
			} else if (range.first >= n) break;
		}
	}
	cout << part1 << "\n";

	for(auto range : r) {
		if(!f.empty()) {
			auto last = f.back();
			if(last.second >= range.first) {
				f.back().second = max(range.second, last.second);
			}
			else f.pb(range);
		}
		else f.pb(range);
	}

	ll part2 = 0;
	for(auto range : f) {
		part2 += range.second - range.first + 1;
	}
	cout << part2 << "\n";
}
