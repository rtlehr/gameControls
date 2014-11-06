/**
* Holds all of the code for the game states play
*
* @class Game.States.Play
*/

var game = new Phaser.Game(1024, 672, Phaser.CANVAS, 'phaser-example',{ preload: preload, create: create, update: update, render: render });

	function preload() 
    {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
		this.scale.minWidth = 480;                                                                                                                      
		this.scale.minHeight = 260;
		this.scale.maxWidth = 1024;
		this.scale.maxHeight = 672;
		
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		
		this.scale.setScreenSize(true);
		
		this.stage.forcePortrait = false;
		this.stage.backgroundColor = '#111111';
		
		this.input.addPointer();
		
     	game.load.image('grid', 'assets/images/grid.jpg');
		game.load.image('rocket', 'assets/images/rocketShip.png');
		game.load.image('base', 'assets/images/gamePad/joystick-base.png');
		game.load.image('stick', 'assets/images/gamePad/joystick-stick.png');
		
    }
	
	function create() 
    {		
		
        this.game.world.setBounds(0, 0, 1200, 1200);
        
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        
        this.game.add.sprite(0,0,'grid');
        
        this.rocket = this.game.add.sprite((this.game.camera.width/2),(this.game.world.height/2)-50,'rocket');
        this.rocket.anchor.setTo(0.5,0.5);
        
        this.game.physics.p2.enable(this.rocket);
        this.game.camera.follow(this.rocket);
                        
        //Add the game interface
        this.gameInterface = new GameInterface(this.game,2,true);
        this.gameInterface.fixedToCamera();
		
	}

	function update() 
    {
		console.log("update");
        this.gameInterface.update();
        
        this.rocket.body.setZeroVelocity();
        
        this.baseSpeed = 1500;
        
        var horzVal = this.gameInterface.getHorzVal();
        
        var vertVal = this.gameInterface.getVertVal();
        
        this.rocket.body.moveRight(this.baseSpeed * horzVal);
        
        this.rocket.body.moveDown(this.baseSpeed * vertVal);
    
				
	}
	
    function render()
    {
        //this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //this.game.debug.spriteCoords(this.rocket, 32, 200);
    }

