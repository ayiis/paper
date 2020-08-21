```bash
#
# Put this in ~/.bashrc
#

# default settings
{
    [[ $- == *i* ]] && stty -ixany

    # open new terminal from current directory
    . /etc/profile.d/vte*.sh > /dev/null
}

# shell settings
{
    export CLICOLOR=1
    # prompt style
    export PS1='\[\033[1;35m\][\u@\h][\t][\w]\n\[\033[0m\]'
}

# basic alias
{
    # override the old
    alias grep='command grep --color=auto'
    alias rm='command rm -i'
    alias mv='command mv -i'
    alias cp='command cp -i'
    alias which='builtin alias | /usr/bin/which --tty-only --read-alias --show-dot --show-tilde'
    alias ls='command ls -N --color=auto --time-style=long-iso'

    # create new
    {
        alias ll='ls -l'
        alias la='ll -a'
        alias llc='ll --time=c'
        alias llt='ll -hrt'
        alias lls='ll -hrS'
    }
}

# system administator
{
    alias pp='command ps aux'
    alias pscpu="pp|awk 'NR>1{print }'|sort -rnk3|head -n20"
    alias psmem="pp|awk 'NR>1{print }'|sort -rnk4|head -n20"
    alias mem='command cat /proc/meminfo |command grep -eMem -eSwap -eBuffers -eCached'

    alias nn='command netstat -anopt'
    alias nnl='command netstat -noptl'
    alias ntt="nn|awk 'NR>2{print \$6}'|sort|uniq -c|sort -rn"

    netin() { nn|awk '$6!="LISTEN"&&$4~/:'$1'$/{print $5}'|awk -F: '{print $1}'|sort|uniq -c|sort -nr|head -n20;}
    netout() { nn|awk '$6!="LISTEN"&&$5~/:'$1'$/{print $5}'|awk -F: '{print $1}'|sort|uniq -c|sort -nr|head -n20;}

    stc() { strace -C -T -tt -e trace=all $*; }
    lpof() { lsof -np $* 2>/dev/null|grep -e "\btxt\b" -e "\bcwd\b"; }
}

# hot key for python
{
    # alias python=/usr/local/bin/python
    alias rpy='command find . -name "*.pyc"|xargs rm -f'
    alias npp='stdbuf -o0 nohup python -u app.py >nohup.out 2>&1 &'
    alias pipi='pip3 install -i https://pypi.ayiis.me/simple/ --no-deps --upgrade'
}

# useful hotkey
{
    # create random string
    alias rand='openssl rand -hex 16'

    # set proxy for ss
    pss() { export http_proxy=http://127.0.0.1:1087/ && https_proxy=http://127.0.0.1:1087/ && ftp_proxy=http://127.0.0.1:1087/ && all_proxy=http://127.0.0.1:1087/; }

    # download url file
    alias download='python3 /mine/github/coding/downloader/app.py'
    alias sserver='python /opt/sserver/sssrc/server.py -c /opt/sserver/ss.conf -d start'

    # start ss server
    alias sserver='python /opt/sserver/sssrc/server.py -c /opt/sserver/ss.conf -d start'
}

# for CentOS
{
    alias goo='gvfs-open'

    # software settings
    {
        sublime() { /bin/bash -c "/mine/soft/sublime_text3/sublime_text $* >/dev/null 2>&1 &exit"; }
    }
}

```
