let is_neg str = if str = 'L' then -1 else 1;;

let rec read_input acc =
    try
        let ic = input_line stdin in
        let m = is_neg (String.get ic 0) in
        let n = m * int_of_string ( String.sub ic 1 (String.length ic - 1) ) in
        read_input ( n :: acc);
    with End_of_file -> List.rev(acc);;

let part1 acc c =
    let sum = List.hd acc in
    let oldVal = List.nth acc 1 in
    let newVal = (((oldVal + c) mod 100) + 100) mod 100 in
    [sum + (if newVal = 0 then 1 else 0); newVal]

let part2 acc c =
    let sum = List.hd acc in
    let oldVal = List.nth acc 1 in
    let newVal = (((oldVal + c) mod 100) + 100) mod 100 in
    let tmpVal = oldVal + (c mod 100) in
    let bonusRevs = (if (abs c) > 99 then (abs c) / 100 else 0) in
    let overShoot = (if oldVal != 0 && tmpVal < 0 || tmpVal > 100 then 1 else 0) in
    [sum + (if newVal = 0 then 1 else 0) + bonusRevs + overShoot; newVal]

let () =
    let data = read_input [] in
    let p1 = List.hd (List.fold_left (part1) [0; 50] data) in
    let p2 = List.hd (List.fold_left (part2) [0; 50] data) in
    Printf.printf "%d\n%d\n" p1 p2;
