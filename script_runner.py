import frida
import sys

def on_message(message, data):
    pass
    #print(message)

#if this program is being run directly
if __name__ == "__main__":

    #Make sure we are getting the right number of arguments
    #process is not relative, script is
    if (len(sys.argv) < 2 or len(sys.argv) > 3):
        print(f"usage: {sys.argv[0]} (process) [script]")
        exit(1)
    
    #arg[1] is the process we are attaching to
    #arg[2] is an optional name of the script we want to run
    #if arg[2] is ommitted, look for a script that is the name of the process + ".js"

    session = frida.attach(sys.argv[1])
    
    #if arg[2] is defined, use that. Otherwise, use process + ".js"
    if (len(sys.argv) == 3):
        script_file = sys.argv[2]
    else :
        script_file = sys.argv[1] + ".js"
    
    #now, open the file in read mode
    #if it does not exist, warn the user and exit the program
    try:
        f = open(script_file, "r")

    except FileNotFoundError:
        print(f"There is no script with the name {script_file} present.")
        exit(1)

    #create the script
    script = session.create_script(
        f.read()
    )
    #the script could also be a string with javascript in it.
    #doing it this way means that we get help from our ide when writing it

    #setup to receive potential messages from the script
    script.on('message', on_message)
    
    #load the script
    script.load()

    #block the program, so that it does not end, so that our script can run and potentially send messages back
    sys.stdin.read()
