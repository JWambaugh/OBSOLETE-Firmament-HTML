

var Firmament={};

Firmament.playerId=null;


Firmament.Gui = function(playerId){
	this.playerId=playerId;


	this.chatOutput = new Ext.Panel({
		html:"Chat"
		,flex:1
		,autoScroll:true
		,cls:'chatWindow'
	});

	this.chatInput = new Ext.Panel({
		html:"<input style='width:100%' type='text'>"
	});



	this.chatWindow = new Ext.Panel({
		title:'Chat'
		,layout:'vbox'
		,layoutConfig:{align:'stretch'}
		,items:[this.chatOutput,this.chatInput]
	});
	

	this.centerPanel= new Ext.Panel({
			region:'center'
			,split:true

			});
	
	this.bottomPanel= new Ext.TabPanel({
			region:'south'
			,height:100
			,split:true
			,tabPosition:'bottom'
			,items:[this.chatWindow]
			,activeTab:0
			});

	this.leftPanel= new Ext.Panel({
			region:'west'
			,html:"This is the bottomRegion"
			,split:true
			,contentEl:'radar'
			});

	this.rightPanel= new Ext.Panel({
			region:'east'
			,title:'sats'
			,collapsible: true
			,html:"This is the bottomRegion"
			,split:true

			});


	this.mainPanel = new Ext.Viewport({
        collapsible:true
        ,renderTo: document.body
		,layout:"border"
		,items:[this.centerPanel,this.bottomPanel,this.leftPanel,this.rightPanel]
    });

	


	//
	//REGISTER EVENT HANDLERS

	//scroll to bottom of chat window on resize
	this.bottomPanel.on('resize',function(){
		this.chatOutput.body.scroll('b',this.chatOutput.body.getHeight()+1000000);
	},this);


	this.initializeRadar=function(){
		var el=Ext.get('radar');
		var buttons=el.select('input');
		buttons.each(function(el,comp,index){
			el.on('click',function(evt,ele){
				this.requestMove(ele.value);
			},this);
			log(el.dom.value);
		},this)
	}



	//parseResponse - parses responses from the server and does accordingly.
	this.parseResponse = function(response,options){
		log(response.responseText)
		eval('var res='+response.responseText);

		if(typeof(res)=='object'){
			for(var x=0; x<res.length;x++){
				var command=res[x];
				if(command.command){
					switch(command.command){
						case  'loginFailure':
							this.showLoginBox();
							break;
						case  'loginSuccess':
							this.playerId=command.playerId;
							requestUpdateAll();
							break;
						case 'setMessages':
							this.renderChatMessages(command.messages);
							break;
						case 'setRadar':
							this.updateRadar(command.directions)
							break;
						case 'updateRadar':
							this.requestRadarUpdate();
							break;
						case 'updateChat':
							this.requestChatUpdate();
							break;
						case 'setLocationDescripton':
							this.updateLocationDescription(command);
							break;
						case 'updateLocationDescription':
							this.requestLocationDescription(command);
							break;

					}
				}
			}
		}

		
	}

	
	//server requests
	this.requestChatUpdate = function(){
		Ext.Ajax.request({
			   url: '/play/getmessages',
			   success: this.parseResponse,
			   failure: this.parseResponse,
			   scope:this
			});
	}

	this.requestRadarUpdate = function(){
		Ext.Ajax.request({
			   url: '/play/getradar',
			   success: this.parseResponse,
			   failure: this.parseResponse,
			   scope:this
			});

	}

	this.requestMove=function(direction){
		Ext.Ajax.request({
			   url: '/play/move',
			   success: this.parseResponse,
			   failure: this.parseResponse,
			   params:{l:direction},
			   method:'GET',
			   scope:this
			});

	}

	this.requestLocationDescription=function(direction){
		Ext.Ajax.request({
			   url: '/play/getlocationdescription',
			   success: this.parseResponse,
			   failure: this.parseResponse,
			   method:'GET',
			   scope:this
			});

	}



	this.requestUpdateAll = function(){
		this.requestChatUpdate();
		this.requestRadarUpdate();
		this.requestLocationDescription();
	}


	
	// PUBLIC GUI METHODS
	
	this.setChat = function(text){
		this.chatOutput.body.update(text);
		this.chatOutput.body.scroll('b',this.chatOutput.body.getHeight()+20);
	}

	this.appendChat=function(text){
		this.chatOutput.body.update(this.chatOutput.body.dom.innerHTML+text);
		this.chatOutput.body.scroll('b',this.chatOutput.body.getHeight()+20);
	}
	
	this.setMainContent = function(text){
		this.centerPanel.body.update(text);
	}

	this.updateLocationDescription=function(data){
		this.setMainContent("<h1>"+data.title+"</h1>"+data.description);
	}
	
	this.renderChatMessages = function(messages){
		var buffer='';
		for(var x=0;x<messages.length;x++){
			buffer+='<br>'+messages[x].message;
		}
		this.setChat(buffer);
	}

	this.updateRadar=function(directions){
		for (var direction in directions){
			
			el=Ext.get(direction+'Button');
			
			if(directions[direction]==1){
				el.dom.disabled=false;
				log('enabled')
			}else{
				el.dom.disabled=true

			}
		}
	}

	this.showLoginBox=function(){
		Ext.Msg.show({
		   title:'Log In',
		   msg: 'Please enter your email address and password to login:<br><br>Email: <input type="text" id="loginEmail"><br>Password: <input type="password" id="loginPassword">',
		   fn:function(button){
		   		var email = Ext.get('loginEmail').dom.value;
				var pass = Ext.get('loginPassword').dom.value;
				Ext.Ajax.request({
				   url: '/auth/login',
				   success: this.parseResponse,
				   failure: this.parseResponse,
				   params: { email: email,password:pass }
				   ,scope:this
				});
						   },
			scope:this,
		   buttons: Ext.Msg.OK,
		   icon: Ext.MessageBox.QUESTION
		});
	}
	



	//test our setters
	this.setChat('This is the chat window<br>It can contain<br> a lot<br> of thisngs<br>this <br> is some<br> of the text<br> it<br> may contain<br>');
	this.setMainContent("This is should be the main content");

	
	this.initializeRadar();
	//if we are not logged in, show login window
	if(!this.playerId){
		this.showLoginBox();
	}else{
		this.requestUpdateAll();
	}


//	this.appendChat("this should bended");
}


function log(str){
	if(window.console){
		window.console.log(str);
	}
}

