```bash
#
# Put this in ~/.bash_profile
#

# default settings
{
    # Make bash check its window size after a process completes
    shopt -s checkwinsize

    [ -r "/etc/bashrc_$TERM_PROGRAM" ] && . "/etc/bashrc_$TERM_PROGRAM"
}

# shell settings
{
    export CLICOLOR=1
    # prompt style
    export PS1='\[\033[7;33m\][\u@\h][\t][\w]\n\[\033[0m\]'

    # use GNU command
    {
        PATH="/usr/local/opt/coreutils/libexec/gnubin:$PATH"
        MANPATH="/usr/local/opt/coreutils/libexec/gnuman:$MANPATH"
    }
}

# USE CHINESE
{
    export LC_ALL=zh_CN.UTF-8
    stty pass8
    bind 'set convert-meta off'
    bind 'set meta-flag on'
    bind 'set output-meta on'
}

# basic alias
{
    # override the old
    alias grep='command ggrep --color=auto'
    alias rm='command rm -i'
    alias mv='command mv -i'
    alias which='builtin alias | command gwhich --tty-only --read-alias --show-dot --show-tilde'
    alias ls='command ls -N --color=auto --time-style=long-iso'

    # create new
    {
        alias ll='ls -l'
        alias lla='ll -a'
        alias llt='ll -hrt'
        alias lls='ll -hrS'
        alias llc="ll --time=c"
    }
}

# system administator
{
    alias pp='command ps aux'
    alias ppc="pp|awk 'NR>1{print }'|sort -rnk3|head -n20"
    alias ppm="pp|awk 'NR>1{print }'|sort -rnk4|head -n20"

    alias nn='command netstat -anv -ptcp'
    alias nnl='nn|grep "\bLISTEN\b"'
    alias ntt="nn|awk 'NR>2'|awk '{print \$6}'|sort|uniq -c|sort -rn"

    nin() { nn|awk 'NR>2'|awk '$6!="LISTEN"&&$4~/.'$1'$/{print $5}'|awk -F. '{printf "%s.%s.%s.%s\n",$1,$2,$3,$4}'|sort|uniq -c|sort -nr|head -n20;}
    nout() { nn|awk 'NR>2'|awk '$6!="LISTEN"&&$5~/.'$1'$/{print $5}'|awk -F. '{printf "%s.%s.%s.%s\n",$1,$2,$3,$4}'|sort|uniq -c|sort -nr|head -n20;}

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
    alias download='python /mine/github/coding/downloader/app.py'
}

# for MacOS
{
    alias goo='command open'

    # shotcuts for apps
    source ~/.fast_open

    # software settings
    {
        # fuck brew for updating painfully slowly
        export HOMEBREW_NO_AUTO_UPDATE=1
    }
}

```
