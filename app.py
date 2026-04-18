from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Cho phép React gọi API

# Đường dẫn model (đã được train từ train_model.py)
MODEL_PATH = 'models/model.pkl'
VECTORIZER_PATH = 'models/vectorizer.pkl'

# Kiểm tra file model có tồn tại không
if not os.path.exists(MODEL_PATH) or not os.path.exists(VECTORIZER_PATH):
    print("⚠️ Model not found! Please run 'python train_model.py' first.")
    # Tạo model giả nếu chưa có (để demo)
    from sklearn.ensemble import RandomForestRegressor
    from sklearn.feature_extraction.text import TfidfVectorizer
    model = RandomForestRegressor(n_estimators=10, random_state=42)
    vectorizer = TfidfVectorizer(max_features=100)
    # Fit dữ liệu giả
    dummy_texts = ["login", "reset password", "admin panel"]
    vectorizer.fit(dummy_texts)
    model.fit(vectorizer.transform(dummy_texts), [3,5,8])
    print("⚠️ Using dummy model for demo.")
else:
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)

# Fibonacci story points
FIB = [1, 2, 3, 5, 8, 13, 21]

def round_to_fib(x):
    return min(FIB, key=lambda f: abs(f - x))

# ------------------------------
# Endpoint dự đoán một user story
# ------------------------------
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    user_story = data.get('user_story', '')
    model_name = data.get('model', 'BERT Transformer (Recommended)')
    
    if not user_story:
        return jsonify({'error': 'No user story provided'}), 400
    
    # Vector hóa và dự đoán
    X_input = vectorizer.transform([user_story])
    raw_pred = model.predict(X_input)[0]
    story_point = round_to_fib(raw_pred)
    
    # Giả lập confidence (dựa trên khoảng cách đến Fibonacci)
    confidence = max(50, min(99.9, 100 - abs(raw_pred - story_point) * 10))
    
    # Điều chỉnh theo model (mô phỏng)
    if 'XGBoost' in model_name:
        story_point = min(13, story_point + 1)
        confidence = confidence * 0.95
    elif 'Random Forest' in model_name:
        story_point = max(1, story_point - 1)
        confidence = confidence * 0.9
    elif 'Linear Regression' in model_name:
        story_point = min(21, story_point + 2)
        confidence = confidence * 0.85
    
    return jsonify({
        'story_points': int(story_point),
        'confidence': round(confidence, 1),
        'model_used': model_name,
        'raw_prediction': round(raw_pred, 2)
    })

# ------------------------------
# Endpoint lấy metrics (giả lập)
# ------------------------------
@app.route('/metrics', methods=['GET'])
def metrics():
    metrics_data = {
        "BERT Transformer (Recommended)": {"accuracy": 94.2, "mae": 0.62, "rmse": 0.89},
        "XGBoost": {"accuracy": 88.5, "mae": 0.89, "rmse": 1.12},
        "Random Forest": {"accuracy": 82.1, "mae": 1.12, "rmse": 1.45},
        "Linear Regression": {"accuracy": 72.3, "mae": 1.35, "rmse": 1.78}
    }
    return jsonify({"metrics": metrics_data})

# ------------------------------
# Endpoint batch predict (upload CSV)
# ------------------------------
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/batch_predict', methods=['POST'])
def batch_predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    model_name = request.form.get('model', 'BERT Transformer (Recommended)')
    
    if not (file and allowed_file(file.filename)):
        return jsonify({'error': 'File type not allowed. Please upload CSV.'}), 400
    
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    df = pd.read_csv(filepath)
    
    # Tìm cột chứa user story
    story_col = None
    for col in ['user_story', 'story', 'User Story', 'description', 'text']:
        if col in df.columns:
            story_col = col
            break
    if story_col is None:
        return jsonify({'error': 'CSV must contain a user story column'}), 400
    
    results = []
    for idx, row in df.iterrows():
        story = row[story_col]
        if pd.isna(story) or str(story).strip() == '':
            continue
        X_input = vectorizer.transform([str(story)])
        raw_pred = model.predict(X_input)[0]
        story_point = round_to_fib(raw_pred)
        confidence = max(50, min(99.9, 100 - abs(raw_pred - story_point) * 10))
        
        # Điều chỉnh theo model
        if 'XGBoost' in model_name:
            story_point = min(13, story_point + 1)
            confidence *= 0.95
        elif 'Random Forest' in model_name:
            story_point = max(1, story_point - 1)
            confidence *= 0.9
        elif 'Linear Regression' in model_name:
            story_point = min(21, story_point + 2)
            confidence *= 0.85
        
        results.append({
            'story': str(story)[:60] + '...' if len(str(story)) > 60 else str(story),
            'story_points': int(story_point),
            'confidence': round(confidence, 1)
        })
    
    return jsonify({'results': results})

if __name__ == '__main__':
    app.run(debug=True, port=5000)