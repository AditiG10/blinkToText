from flask import Flask,render_template,url_for,request,jsonify
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template("index.html")
   
@app.route('/process', methods=['POST'])
def process():
    file=open("haze.txt","r")
    line=file.readline()
    file.close()
    file=open("haze.txt","w")
    file.write("2")
    file.close()
    return jsonify({'name' : line})
 
if __name__ == "__main__":
    app.run(debug=True)
    
