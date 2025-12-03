my $part1 = 0;
my $part2 = 0;

while (<>) {
	my @ranges = split(/,/);
	foreach (@ranges) {
		my @nums = split(/-/);
		my $start = @nums[0];
		my $end = @nums[1];

		for($i = $start; $i <= $end; ++$i) {
			if($i =~ /^(\d+)\1$/) {
				$part1 += $i;
			}
			if($i =~ /^(\d+)\1+$/){
				$part2 += $i;
			}
		}
	}
}
print "$part1\n$part2\n";
