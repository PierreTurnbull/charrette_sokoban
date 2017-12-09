//document.addEventListener("DOMContentLoaded", function()
//{
    var grid_map =
    [
      [2, 2, 2, 2, 2, 6, 6, 6, 6, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4],
      [4, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 4],
      [4, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 5, 5, 5, 5, 5, 5, 2, 3, 5, 5, 5, 5, 5, 5, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 5, 5, 5, 5, 5, 5, 2, 2, 5, 5, 5, 5, 5, 5, 2, 2, 2, 2],
      [2, 3, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 5, 5, 5, 5, 5, 5, 3, 2, 5, 5, 5, 5, 5, 5, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];
    var blocks  = document.querySelectorAll(".block");
    var char    =
    {
      dom_element   : document.querySelector(".char"),
      index_x       : 0,
      index_y       : 0,
      pos_x         : 20,
      pos_y         : -24,
    };

    function refresh_pos()
    {
      char.pos_x                    = char.index_x * 64 - 24;
      char.pos_y                    = char.index_y * 64 + 20;
      char.dom_element.style.top    = char.pos_x + "px";
      char.dom_element.style.left   = char.pos_y + "px";
    }

    for (let i = 0; i < grid_map.length; i++)
    {
      for (let j = 0; j < 20; j++)
      {
        if (grid_map[i][j] == 1)
          blocks[i * 20 + j].classList.toggle("block_wall");
        if (grid_map[i][j] == 2)
          blocks[i * 20 + j].classList.toggle("block_floor");
        if (grid_map[i][j] == 3)
          blocks[i * 20 + j].classList.toggle("block_box");
        if (grid_map[i][j] == 4)
          blocks[i * 20 + j].classList.toggle("block_door");
        if (grid_map[i][j] == 5)
          blocks[i * 20 + j].classList.toggle("block_table");
        if (grid_map[i][j] == 6)
          blocks[i * 20 + j].classList.toggle("block_board");
      }
    }

    char.index_x                  = 1;
    char.index_y                  = 1;
    char.pos_x                    = char.index_x * 64 - 24;
    char.pos_y                    = char.index_y * 64 + 20;
    char.dom_element.style.left   = char.pos_y + "px";
    char.dom_element.style.top    = char.pos_x + "px";

    function check_move(dir_x, dir_y)
    {
      console.log(char.index_y + dir_x, char.index_x + dir_y);
      console.log(grid_map[char.index_y + dir_x][char.index_x + dir_y] == 1);
      if (grid_map[char.index_x + dir_x][char.index_y + dir_y] == 2)
        return true;
      return false;
    }

    var stop = 0;
    var wait_until;
    var wait_now;
    window.addEventListener("keydown", function(event)
    {
      if (stop == 1)
      {
        wait_now = new Date().getTime();
        if (wait_now > wait_until)
          stop = 0;
      }
      if (stop == 0)
      {
        console.log(event.which);
        if (event.which == 38 && check_move(-1, 0))
          char.index_x--;
        if (event.which == 40 && check_move(1, 0))
          char.index_x++;
        if (event.which == 37 && check_move(0, -1))
          char.index_y--;
        if (event.which == 39 && check_move(0, 1))
          char.index_y++;
        if (event.which == 49)
          char.dom_element.style.backgroundImage = "url(images/villamontero.png)";
        if (event.which == 50)
          char.dom_element.style.backgroundImage = "url(images/yann.png)";
        if (event.which == 51)
          char.dom_element.style.backgroundImage = "url(images/Tisbron.png)";
        refresh_pos();
        stop = 1;
        wait_until = new Date().getTime() + 100;
      }
    });
//});
