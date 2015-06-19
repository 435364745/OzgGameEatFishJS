/**
 * Created by licamla on 2015/6/18.
 */
var BaseLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        if(!cc.audioEngine.isMusicPlaying() && cfg.audio.music)
            cc.audioEngine.playMusic(res.audios_bg_mp3, true);

        return true;
    }
});
