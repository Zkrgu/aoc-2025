let parse_range str =
    if String.empty = str then
        []
    else
        List.map (int_of_string) (String.split_on_char '-' str)

let not_empty list = not (List.is_empty list)

let rec read_input acc =
    try
        let ic = input_line stdin in
        let ranges = String.split_on_char ',' ic in
        let parsed = List.map (parse_range) ranges in
        read_input ( parsed :: acc);
    with End_of_file -> List.filter (not_empty) (List.concat (List.rev acc));;

let rec range a b =
    if a > b then []
    else a :: range(a + 1) b

let halves_equal num =
    let fnum = Float.of_int num in
    let half = Float.to_int (Float.pow 10. (Float.floor (Float.div(Float.ceil (Float.log10 fnum)) 2.))) in
    let top = num / half in
    let bottom = num mod half in
    if top = bottom then num else 0

let exp10 num = Float.to_int (Float.pow 10. (Float.of_int num))

let rec repeat_eq num div =
    if num < div then num
    else
        if num mod div = repeat_eq (num / div) div then
            num mod div
        else
            0

let repeating_num num =
    let fnum = Float.of_int num in
    let oom = Float.to_int (Float.ceil (Float.log10 fnum)) in
    let half = Float.to_int (Float.floor (Float.div (Float.of_int oom) 2.)) in

    let test = List.map (fun exp -> repeat_eq num exp) (List.map (exp10) (List.filter (fun n -> oom mod n = 0) (range 1 half))) in
    let valid = List.filter (fun n -> n != 0) test in

    if not (List.is_empty valid) then num else 0

let part1 acc c =
    let start = List.hd c in
    let rend = List.nth c 1 in
    let mapped = List.map (halves_equal) (range start rend) in
    let sum = List.fold_left (+) 0 mapped in
    acc + sum

let part2 acc c =
    let start = List.hd c in
    let rend = List.nth c 1 in
    let mapped = List.map (repeating_num) (range start rend) in
    let sum = List.fold_left (+) 0 mapped in
    acc + sum

let () =
    let data = read_input [] in
    let p1 = List.fold_left (part1) 0 data in
    let p2 = List.fold_left (part2) 0 data in
    Printf.printf "%d\n%d\n" p1 p2
