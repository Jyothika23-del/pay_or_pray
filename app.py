from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

game_results = []


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/save-result", methods=["POST"])
def save_result():
    data = request.get_json()

    game_results.append(data)

    return jsonify({
        "success": True,
        "message": "Result saved successfully!"
    })


if __name__ == "__main__":
    app.run(debug=True)