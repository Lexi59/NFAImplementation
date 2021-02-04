class State{
    constructor(id, transitions, initial=false, final = false){
        this.id = id;
        this.transitions = transitions;
        this.initialState = initial;
        this.finalState = final;
    }
    addTransition(transition){
        this.transitions.push(transition);
    }
    setAsInitial(){
        this.initialState = true;
    }
    setAsFinal(){
        this.finalState = true;
    }
    checkTransition(c){
        for(var i = 0; i < this.transitions.length; i++){
            if(this.transitions[i][0].indexOf(c) >= 0){return this.transitions[i][1];}
        }
        return -1;
    }
}

const output = document.getElementById('output');
const form = document.getElementById('emailForm');
form.addEventListener('submit', validate);

function print(str){
    output.innerHTML += "<br>" + str;
}
function validate(e){
    e.preventDefault();
    const formData = new FormData(form);
    var testStr = formData.get('email').toLowerCase();
    output.innerHTML = "";
    print("Testing " + testStr + " ...");
    form.reset();

    var currentState = 0;
    for(var i = 0; i < testStr.length; i++){
        print("At state " + currentState + " - testing character #" + i + ": " + testStr[i]);
        var nextState = states[currentState].checkTransition(testStr[i]);
        if(nextState == -1){print("Unable to find match at state " + currentState); print("REJECT STRING");return;}
        else{print("Moving to state " + nextState);}
        currentState = nextState;
    }
    if(states[currentState].finalState){print("ACCEPT STRING");}
    else{print("REJECT STRING!");}
}

//build NFA
const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
var states = [];

states[0] = new State(0, [[chars, 1]],          true);
states[1] = new State(1, [[chars, 1], ["@", 2]]);
states[2] = new State(2, [[chars, 3]]);
states[3] = new State(3, [[chars, 3], [".", 4]]);
states[4] = new State(4, [[chars, 5]]);
states[5] = new State(5, [[chars, 6], [".", 4]]);
states[6] = new State(6, [[chars, 7], [".", 4]], false, true);
states[7] = new State(7, [[chars, 8], [".", 4]], false, true);
states[8] = new State(8, [[chars, 8], [".", 4]]);

