/*:ja
 * @plugindesc (v.1.0) トリガー条件毎に、異なるイベントコマンドを実行できます。
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 * 
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 * 
 * 元プラグイン:
 * https://galvs-scripts.com/2020/10/18/mz-event-start-types/
 * 
 *   Galv's Event Start Types MZ
 * ----------------------------------------------------------------------------
 * イベントの中に条件分岐を設定して、
 * そのイベントが決定ボタンによって起動したのか、
 * プレイヤーから接触によって起動したのか、
 * イベントから接触によって起動したのかを判断できるようになります。
 * イベントのトリガーを3つの方法で起動させることができるので、
 * イベントの条件分岐を利用して、
 * そのイベントにそれぞれ異なるコマンドを実行させるのに便利かもしれません。
 * ----------------------------------------------------------------------------
 *  条件分岐スクリプト
 * ----------------------------------------------------------------------------
 * 
 *    this.startType(x);    // xは以下のように開始タイプの番号です。
 *                          // 0 - 決定ボタン
 *                          // 1 - プレイヤーから接触
 *                          // 2 - イベントから接触
 */
//-----------------------------------------------------------------------------
//  Galv's Event Start Types MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MZ
//  GALV_EventStartTypesMZ.js
//-----------------------------------------------------------------------------
//  2020-10-18 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_EventStartTypes = true;

var Galv = Galv || {};           // Galv's main object
Galv.ESTART = Galv.ESTART || {}; // Plugin object

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.0) Allows different event commands to be run depending how the event was activated
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 *
 * @help
 *   Galv's Event Start Types MZ
 * ----------------------------------------------------------------------------
 * This plugin allows you to set up conditional branches in events that can
 * determine if the event was started by player action, player touching event
 * or event touching the player.
 * "Event Touch" events can be activated by all three methods, so this could
 * be useful for making that event do different commands for each using the
 * event's conditional branches.
 * ----------------------------------------------------------------------------
 *  CONDITION BRANCH SCRIPT
 * ----------------------------------------------------------------------------
 *
 *    this.startType(x);    // x is the start type number as below:
 *                          // 0 - Player action
 *                          // 1 - Player collided with event
 *                          // 2 - Event collided with player
 *
 * ----------------------------------------------------------------------------
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

// GAME INTERPRETER
//-----------------------------------------------------------------------------

Game_Interpreter.prototype.startType = function(type) {
	return $gamePlayer._triggerType == type;
};


// GAME EVENT
//-----------------------------------------------------------------------------

Galv.ESTART.Game_Event_checkEventTriggerTouch = Game_Event.prototype.checkEventTriggerTouch;
Game_Event.prototype.checkEventTriggerTouch = function(x, y) {
	if (!$gameMap.isEventRunning() && this._trigger === 2 && $gamePlayer.pos(x, y)) $gamePlayer._triggerType = 2;
	Galv.ESTART.Game_Event_checkEventTriggerTouch.call(this,x,y);
};


// GAME PLAYER
//-----------------------------------------------------------------------------

Galv.ESTART.Game_Player_checkEventTriggerTouch = Game_Player.prototype.checkEventTriggerTouch;
Game_Player.prototype.checkEventTriggerTouch = function(x, y) {
	if (this.canStartLocalEvents()) this._triggerType = 1;
	Galv.ESTART.Game_Player_checkEventTriggerTouch.call(this,x,y);
};

Galv.ESTART.Game_Player_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
Game_Player.prototype.checkEventTriggerThere = function(triggers) {
	this._triggerType = 0;
    Galv.ESTART.Game_Player_checkEventTriggerThere.call(this,triggers);
};