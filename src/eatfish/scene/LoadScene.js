/**
 * Created by licamla on 2015/6/11.
 */

eatfish.scene.LoaderScene = cc.LoaderScene.extend({
   _className : "eatfish.scene.LoaderScene" ,
    init : function(){
        var self = this;

        // bg
        var bgLayer = self._bgLayer = new cc.Layer();
        self.addChild(bgLayer, 0);

        //logo
        var logoWidth = 160;
        var logoHeight = 200;

        var logo = new cc.Sprite(res.Default_png);
        logo.setPosition(cc.p(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2));
        logo.setRotation(-90);
        bgLayer.addChild(logo);

        //image move to CCSceneFile.js
        var fontSize = 24, lblHeight =  -logoHeight / 2 ;
        //loading percent
        var label = self._label = new cc.LabelTTF("Loading... 0%", "Arial", fontSize);
        label.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, lblHeight)));
        label.setColor(cc.color(180, 180, 180));
        bgLayer.addChild(this._label, 10);
        return true;
    }
});

/**
 * <p>cc.LoaderScene.preload can present a loaderScene with download progress.</p>
 * <p>when all the resource are downloaded it will invoke call function</p>
 * @param resources
 * @param cb
 * @param target
 * @returns {cc.LoaderScene|*}
 * @example
 * //Example
 * cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new HelloWorldScene());
    }, this);
 */
eatfish.scene.LoaderScene.preload = function(resources, cb, target){
    var _cc = cc;
    if(!_cc.loaderScene) {
        _cc.loaderScene = new eatfish.scene.LoaderScene();
        _cc.loaderScene.init();
    }
    _cc.loaderScene.initWithResources(resources, cb, target);

    cc.director.runScene(_cc.loaderScene);
    return _cc.loaderScene;
};