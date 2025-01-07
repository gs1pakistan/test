from flask import Flask, render_template, request
import pandas as pd
import os
from fpdf import FPDF

app = Flask(__name__)

# File paths
EXCEL_FILE = "form_data.xlsx"
PDF_DIR = os.path.join(os.getcwd(), "PDF")

# Ensure the PDF directory exists
if not os.path.exists(PDF_DIR):
    os.makedirs(PDF_DIR)

@app.route('/')
def index():
    return render_template('form.html')

@app.route('/submit', methods=['POST'])
def submit():
    # Get form data
    name = request.form['name']
    email = request.form['email']
    age = request.form['age']

    # Create a DataFrame for the new submission
    new_data = pd.DataFrame([[name, email, age]], columns=["Name", "Email", "Age"])

    # Check if the Excel file exists
    if os.path.exists(EXCEL_FILE):
        # Ensure the file is not locked or in use
        try:
            existing_df = pd.read_excel(EXCEL_FILE, engine='openpyxl')
        except PermissionError:
            return "Error: The Excel file is currently in use. Please close it and try again."
        
        # Append the new data to the existing DataFrame
        updated_df = pd.concat([existing_df, new_data], ignore_index=True)
    else:
        # Create a new DataFrame if the file doesn't exist
        updated_df = new_data

    # Save the updated DataFrame to the Excel file
    try:
        updated_df.to_excel(EXCEL_FILE, index=False, engine='openpyxl')
    except PermissionError:
        return "Error: Unable to write to the Excel file. Please ensure it is not open."

    # Generate a PDF for the submission
    pdf_path = os.path.join(PDF_DIR, f"{name}_{email}.pdf")
    generate_pdf(pdf_path, name, email, age)

    return f"Data submitted successfully! PDF saved at {pdf_path}"

def generate_pdf(pdf_path, name, email, age):
    """Generate a PDF for the submitted data."""
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="Form Submission", ln=True, align='C')
    pdf.ln(10)
    pdf.cell(200, 10, txt=f"Name: {name}", ln=True)
    pdf.cell(200, 10, txt=f"Email: {email}", ln=True)
    pdf.cell(200, 10, txt=f"Age: {age}", ln=True)
    pdf.output(pdf_path)

if __name__ == '__main__':
    app.run(debug=True)
