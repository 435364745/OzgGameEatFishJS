
var EFBaseSceneLayer = cc.Layer.extend({
	sprite:null,
	ctor:function () {		
		this._super();
		
		if(!cc.audioEngine.isMusicPlaying())
			cc.audioEngine.playMusic(res.audios_bg_mp3, true);
		
		return true;
	}
});
