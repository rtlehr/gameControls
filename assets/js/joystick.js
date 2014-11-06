

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
		
		//Load the images
     		game.load.image('grid', 'assets/images/grid.jpg');
		game.load.image('rocket', 'assets/images/rocketShip.png');
		game.load.image('base', 'assets/images/gamePad/joystick-base.png');
		game.load.image('stick', 'assets/images/gamePad/joystick-stick.png');
		
    	}
	
	function create() 
    	{		
		//Set the world bounds
	        this.game.world.setBounds(0, 0, 1200, 1200);
	        
	        //Add physics
	        this.game.physics.startSystem(Phaser.Physics.P2JS);
	        
	        //Add the background grid
	        this.game.add.sprite(0,0,'grid');
	        
	        //Add the rocket
	        this.rocket = this.game.add.sprite((this.game.camera.width/2),(this.game.world.height/2)-50,'rocket');
	        this.rocket.anchor.setTo(0.5,0.5);
	        
	        //add the rocket to the physics
	        this.game.physics.p2.enable(this.rocket);
	        this.game.camera.follow(this.rocket);
	                        
	        //Add the game interface
	        this.gameInterface = new GameInterface(this.game,2,true);
	        this.gameInterface.fixedToCamera();
		
	}

	function update() 
    	{
		
	        this.gameInterface.update();
	        
	        this.rocket.body.setZeroVelocity();
	        
	        //Set the base speed of the rocket
	        this.baseSpeed = 1500;
	        
	        //Get the joysticks hoizontal value (-1 to 1)
	        var horzVal = this.gameInterface.getHorzVal();
	        
	        //Get the joysticks verticle value (-1 to 1)
	        var vertVal = this.gameInterface.getVertVal();
	        
	        //move the rocket horizontally
	        this.rocket.body.moveRight(this.baseSpeed * horzVal);
	        
	        //move the rocket vertically
	        this.rocket.body.moveDown(this.baseSpeed * vertVal);
    
				
	}
	
	    function render()
	    {
	        //this.game.debug.cameraInfo(this.game.camera, 32, 32);
	        //this.game.debug.spriteCoords(this.rocket, 32, 200);
	    }

