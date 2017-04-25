# Choose javascript editor
* [ ] Atom – The Perfect IDE for the Web and JavaScript
* [ ] Brackets – The Open Source Code Editor for Web Development
* [ ] Sublime Text – A Very Powerful Text Editor Turned IDE for JavaScript
* [X] [Visual Studio Code](https://code.visualstudio.com/) – The Frontrunner IDE for JavaScript
* [ ] WebStorm – The Best JavaScript IDE [Paid for Full-featured Version]

## My VS Code extensions:
* CSS Formatter
* Document this
* EditorConfig for VS Code
* ESLint
* Git History (git log)
* Local History
* npm
* npm Intellisense
* path Intellisense
* stylelint
* Visual Studio Keymap
* vscode-icons

# Maintain editor consistency

## Install [EditorConfig](http://editorconfig.org/) on VS Code
Open Command Pallete (Ctrl + Shift + P) and execute
```
ext install EditorConfig
```

## Create `.editorconfig` file in your project
Again, open Command Pallete (Ctrl + Shift + P) and search for
```
EditorConfig: Generate
```

Follows my configuration:

`.editorconfig`
```
# http://editorconfig.org

# A special property that should be specified at the top of the file outside of
# any sections. Set to true to stop .editor config file search on current file
root = true

[*]
# Indentation style (tab, space)
indent_style = space

# Indentation size in single-spaced characters (integer, tab)
indent_size = 2

# Line ending file format (lf, crlf, cr)
end_of_line = crlf

# File character encoding (latin1, utf-8, utf-16be, utf-16le)
charset = utf-8

# Denotes whether to trim whitespace at the end of lines (true, false)
trim_trailing_whitespace = true

max_line_length = 80

# Denotes whether file should end with a newline (true, false)
insert_final_newline = true

[*.md]
indent_style = spaces
indent_size = 2
max_line_length = 0
trim_trailing_whitespace = true

[Makefile]
indent_style = tab
indent_size = 4
```
