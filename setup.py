import os
script_path = os.path.abspath(__file__) if "__file__" in locals() else os.path.abspath(sys.argv[0])
script_directory = os.path.dirname(script_path)
print(script_directory)

vs_code_command = f"code {script_directory}"

print(vs_code_command)

project_name = input("Type your project name \n")
color_mode = input("Select mode (dark/light) \n")
font = input("Select which startup font you would like from the list below: \n \n ==================== \n Noto Sans \n Lora \n Montserrat \n DM Serif Display \n ==================== \n \n")
fonts = {
    'Noto Sans': "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');",
    'Lora': "@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');",
    'Montserrat': "@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');",
    'DM Serif Display': "@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');"
}

colors = [
        'rgb(210,210,210)',
        'rgb(30,30,30)'
]
primary = 0
dark = 1
if color_mode == 'dark':
    primary = 1
    dark = 0


html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="script.js" defer></script>
    <link rel="stylesheet" href="style.css">
    <title>{project_name}</title>
</head>
<body>
    <h1>Initial Project created with setup.py</h1>
</body>
</html>
"""

css_content = f"""{fonts[font]}giga
""" + """
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box
}

body {
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
""" + f"""
    background: {colors[primary]};
    color: {colors[dark]};
    font-family: '{font}'
""" + """
}
"""

def write_to_file(file_name, file_content):
    try:
        with open(file_name, 'w') as file:
            file.write(file_content)
        print(f"File '{file_name}' created successfully.")
    except Exception as e:
        print(f"Error: {e}")

write_to_file(f'{script_directory}\index.html', html_content)
write_to_file(f'{script_directory}\style.css', css_content)
write_to_file(f'{script_directory}\script.js', "console.log('Hello World!')")

os.system("live-server")
os.system(vs_code_command)