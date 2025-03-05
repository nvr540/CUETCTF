from flask import Flask, session, redirect, url_for, request, render_template

app = Flask(__name__)
app.secret_key = "secretcrush"  # Change this in production

@app.route('/')
def home():
    if 'user' not in session:
        session['user'] = 'guest'
    return render_template('index.html', user=session['user'])

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/admin')
def admin_panel():
    if session.get('user') == 'admin':
        return render_template('admin.html', user=session['user'])
    else:
        return render_template('forbidden.html'), 403

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
