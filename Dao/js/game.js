// general setters
var board = $('#board');
var player1 = "<h2>X</h2>";
var player2 = "<h2>O</h2>";
var current_turn;
var player_to_move;

var getSquare = function (x, y) {
    var square_id = "#square_" + x.toString() + "_" + y.toString();
    return $(square_id);
}
var getX = function (square) {
    return square.attr('id').substr(7, 1);
}
var getY = function (square) {
    return square.attr('id').substr(9, 1);
}
// remove all available available fields
var clearMoves = function () {
    $(".available").removeClass("available");
}

var checkNoThree = function (x, y) {
    if (getSquare(x + 1, y).text() && getSquare(x + 1, y).text() != player_to_move.text())
        if (getSquare(x + 2, y).text() == player_to_move.text() || getSquare(x + 1, y + 1).text() == player_to_move.text())
            if (getSquare(x + 2, y).text() == getSquare(x + 1, y + 1).text() ||
                getSquare(x + 1, y - 1).text() == player_to_move.text())
                return false;
    if (getSquare(x - 1, y).text() && getSquare(x - 1, y).text() != player_to_move.text())
        if (getSquare(x - 2, y).text() == player_to_move.text() || getSquare(x - 1, y + 1).text() == player_to_move.text())
            if (getSquare(x - 2, y).text() == getSquare(x - 1, y + 1).text() ||
                getSquare(x - 1, y - 1).text() == player_to_move.text())
                return false;
    if (getSquare(x, y + 1).text() && getSquare(x, y + 1).text() != player_to_move.text())
        if (getSquare(x, y + 2).text() == player_to_move.text() || getSquare(x + 1, y + 1).text() == player_to_move.text())
            if (getSquare(x, y + 2).text() == getSquare(x + 1, y + 1).text() ||
                getSquare(x - 1, y + 1).text() == player_to_move.text())
                return false;
    if (getSquare(x, y - 1).text() && getSquare(x, y - 1).text() != player_to_move.text())
        if (getSquare(x, y - 2).text() == player_to_move.text() || getSquare(x - 1, y - 1).text() == player_to_move.text())
            if (getSquare(x, y - 2).text() == getSquare(x - 1, y - 1).text() ||
                getSquare(x + 1, y - 1).text() == player_to_move.text())
                return false;
    return true;
}
// Does not currently account for three stones surrounding enemy
var checkDirection = function (x, y, dx, dy) {
    var bestx = -1; var besty = -1;
    x = parseInt(dx) + parseInt(x);
    y = parseInt(dy) + parseInt(y);
    while (x >= 0 && x < 4 && y >= 0 && y < 4) {
        if (!getSquare(x, y).hasClass("player")) {
            bestx = x;
            besty = y;
        }
        else
            break;
        x = parseInt(dx) + parseInt(x);
        y = parseInt(dy) + parseInt(y);
    }
    if (bestx != -1 && checkNoThree(bestx, besty))
        getSquare(bestx, besty).addClass("available");
}
// helper function
var getMoves = function () {
    var x = getX(player_to_move);
    var y = getY(player_to_move);
    checkDirection(x, y, 1, 0);
    checkDirection(x, y, -1, 0);
    checkDirection(x, y, 0, 1);
    checkDirection(x, y, 0, -1);
}

var checkSquares = function (x1, y1, x2, y2, x3, y3, x4, y4) {
    var player;
    if (player = getSquare(x1, y1).text()) {
        if ((player == getSquare(x2, y2).text()) &&
            (player == getSquare(x3, y3).text()) &&
            (player == getSquare(x4, y4).text()))
            return player;
    }
    return "";
}

// Checks for win after player moves
// currently does nothing once somebody actually wins
var checkWin = function () {
    var winner = checkSquares(0, 0, 3, 3, 0, 3, 3, 0);
    for (var i = 0; i < 4 && winner == ""; i++) {
        if (winner = checkSquares(i, 0, i, 1, i, 2, i, 3)) break;
        if (winner = checkSquares(0, i, 1, i, 2, i, 3, i)) break;
    }
    for (var x = 0; x < 3 && winner == ""; x++) {
        for (var y = 0; y < 3 && winner == ""; y++) {
            if (winner = checkSquares(x, y, x + 1, y, x, y + 1, x + 1, y + 1)) break;
        }
    }
    if (winner) {
        var message = new Windows.UI.Popups.MessageDialog(winner + " wins");
        message.commands.append(new Windows.UI.Popups.UICommand(
            "New Game", newGame));
        message.showAsync();
    }
    return;
}

// switch between the two teams as to who is up
var swapTurn = function () {
    $("." + current_turn).removeClass("current_turn");
    if (current_turn == "player1") current_turn = "player2";
    else current_turn = "player1";
    $("." + current_turn).addClass("current_turn");
}

// swap the attributes of the empty square and the player square
var movePlayer = function (player, place) {
    clearMoves();
    place.html("<h2>" + player.text() + "</h2>");
    player.html("");
    place.addClass("player");
    place.addClass(current_turn);
    player.removeClass("player");
    player.removeClass(current_turn);
    player.removeClass("current_turn");
    checkWin();
    swapTurn();
}

//Board Set Up
var setUp = function () {
    current_turn = "player1";

    for (var x = 0; x < 4; x++) {
        for (var y = 0; y < 4; y++) {
            var square_class = "square";
            var square_id = "square_" + x.toString() + "_" + y.toString();
            board.append("<div id=\"" + square_id + "\" class=\"" + square_class + "\"></div>");
        }
        board.append("<br>");
    }

    for (var i = 0; i < 4; i++) {
        getSquare(i, i).html(player1);
        getSquare(i, i).addClass("player").addClass("player1");
        getSquare(i, 3 - i).html(player2);
        getSquare(i, 3 - i).addClass("player").addClass("player2");
    }

    $('.player1').addClass("current_turn");
    $(".square").click(function () {
        if ($(this).hasClass("current_turn")) {
            player_to_move = $(this);
            clearMoves();
            getMoves();
        }
        else if ($(this).hasClass("available"))
            movePlayer(player_to_move, $(this));
        else
            clearMoves();
    });
}

var newGame = function () {
    board.html("");
    setUp();
}
