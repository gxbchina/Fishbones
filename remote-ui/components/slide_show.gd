extends TabContainer

func next() -> void:
    var next_tab := current_tab + 1
    if next_tab >= get_tab_count(): next_tab = 0
    current_tab = next_tab 
    
func prev() -> void:
    var next_tab := current_tab - 1
    if next_tab < 0: next_tab = get_tab_count() - 1
    current_tab = next_tab
