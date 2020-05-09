

# uninstall
    https://askubuntu.com/questions/206283/how-can-i-uninstall-a-nvidia-driver-completely

    - try:
        /usr/local/cuda-10.0/bin/uninstall_cuda_10.0.pl
        nvidia-uninstall

    - see what you've install:
        dpkg -l |grep -e nvidia -e cuda -e libcudnn

    - clear them all:
        apt-get remove --purge '^nvidia-.*'
        apt-get remove --purge '^cuda-.*'
        apt-get remove --purge '^libcudnn.*'
        apt-get install ubuntu-desktop
        apt autoremove
        apt-get remove --purge 'libnvidia-compute-390'
        apt-get remove --purge 'libnvidia-compute-410'

    - check:
        apt list --installed|grep -e nvidia -e cuda -e libcudnn

        apt list --installed|grep linux-headers
        ldconfig -v|grep libcublas
        ll /usr/lib/x86_64-linux-gnu/libcublas.so*



# install

    https://docs.nvidia.com/cuda/archive/10.0/cuda-installation-guide-linux/index.html#verify-you-have-cuda-enabled-system

    - Disable the Nouveau drivers
        Create a file at /etc/modprobe.d/blacklist-nouveau.conf with the following contents:
            blacklist nouveau
            options nouveau modeset=0

        Regenerate the kernel initramfs:
            $ sudo update-initramfs -u

    - set runlevel 3

        systemctl set-default runlevel3.target

        # reset to X mode: systemctl set-default runlevel5.target

        reboot

    ?? apt -y install nvidia-cuda-toolkit

    apt-get install dkms

    ?? apt-get install linux-headers-$(uname -r)

    sh cuda_10.0.130_410.48_linux.run

        Please make sure that
        -   PATH includes /usr/local/cuda-10.0/bin
        -   LD_LIBRARY_PATH includes /usr/local/cuda-10.0/lib64, or, add /usr/local/cuda-10.0/lib64 to /etc/ld.so.conf and run ldconfig as root

        To uninstall the CUDA Toolkit, run the uninstall script in /usr/local/cuda-10.0/bin
        To uninstall the NVIDIA Driver, run nvidia-uninstall

        Please see CUDA_Installation_Guide_Linux.pdf in /usr/local/cuda-10.0/doc/pdf for detailed information on setting up CUDA.

        Logfile is /tmp/cuda_install_21922.log

    vi /etc/environment
        PATH="/usr/local/cuda-10.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games"
    source /etc/environment
    
    vi /etc/ld.so.conf.d/cuda-10-0.conf
        /usr/local/cuda-10.0/lib64
    ldconfig

    dpkg -i libcudnn7_7.6.5.32-1+cuda10.0_amd64.deb

    apt -y install nvidia-cuda-toolkit

    reboot

# check

    ll /root/NVIDIA_CUDA-10.0_Samples/


# Problem

    - NVIDIA-SMI has failed because it couldn't communicate with the NVIDIA driver. Make sure that the latest NVIDIA driver is installed and running.

        - 拔掉显示器（否则会启动原生的驱动）
            个鬼啊，不知道啥问题，过两天再搞吧

        - 
            prime-select query
            prime-select intel
            prime-select nvidia

        - 
            apt install nvidia-cuda-toolkit

        -

            grep -i "nvidia" /var/log/Xorg.0.log
                (II) NOUVEAU driver for NVIDIA chipset families :



    - The driver installation has failed due to an unknown error. Please consult the driver installation log located at /var/log/nvidia-installer.log.

        The package that is already installed is named nvidia-410-410.

            $ apt-get remove --purge nvidia-410
            $ apt-get autoremove

        Please see /var/log/nvidia-installer.log for more details

    - DNS 设置了一直不生效

        检查下面的文件：
            - /etc/systemd/resolved.conf
            - /etc/network/interfaces
            - /etc/netplan/*.yaml

        重启DNS解析器：
            systemctl restart systemd-resolved

        瞎几把乱改，真是垃圾

    - NO_PUBKEY
    - Err:4 https://nvidia.github.io/libnvidia-container/ubuntu18.04/amd64  InRelease
    - The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 6ED91CA3AC1160CD

        https://github.com/NVIDIA/nvidia-docker/issues/1081

        curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -

    - /sbin/ldconfig.real: Can't stat /usr/local/lib/x86_64-linux-gnu: No such file or directory

        https://stackoverflow.com/questions/49241364/ldconfig-seems-to-be-missing-one-of-the-symlinks

        - cat /etc/ld.so.conf
        - cat /etc/ld.so.conf.d/

    - /sbin/ldconfig.real: Path `/lib/x86_64-linux-gnu' given more than once

        https://askubuntu.com/questions/272369/ldconfig-path-lib-x86-64-linux-gnu-given-more-than-once

        ldconfig.real searches /lib/x86_64-linux-gnu and /usr/lib/x86_64-linux-gnu by default.

        so, remove /etc/ld.so.conf.d/x86_64-linux-gnu.conf

    - The driver installation is unable to locate the kernel source

        https://unix.stackexchange.com/questions/115289/driver-install-kernel-source-not-found

        apt-get install dkms        

    - Booting in insecure mode

        https://askubuntu.com/questions/726052/ubuntu-booting-in-insecure-mode-with-secureboot-enabled

        mokutil --enable-validation
        mokutil --disable-validation

        - How to disable the UEFI secure boot:

            Make sure the "OS Type" is "Windows UEFI"
            Enter "Key Management"
            Select "Clear Secure Boot keys" (You will have the option "Install default Secure Boot keys" to restore the default keys after you cleared the Secure Boot Keys)


    - no desktop
        echo 'nouveau' | sudo tee -a /etc/modules

    - 主板黑屏
        华硕主板
        盲操：
            开机
            按 DEL -> 进入 bios
            按 F5  -> 恢复默认设置
            按 回车 -> 默认是 OK 的，直接回车就行了

    - 看 GPU 硬件信息

        lsb_release -a

        lshw -C display

        - Module nvidia not found in directory /lib/modules/5.0.0-37-generic

            /sbin/modprobe nvidia

        - kernel package linux-headers-5.0.0-37-generic is not supported


        - 草了 linux-headers 版本太新了 (为什么会自动更新？？？？？？)

            uname -r

    草了，重装 nvidia 驱动

        apt-get install dkms
        nvidia-dkms-390
        apt-get install nvidia-driver-390
        apt-get install nvidia-utils-390




        apt-get install linux-headers-4.15.0-45

        -4.15.0-45

    $ cat /etc/network/interfaces
        # interfaces(5) file used by ifup(8) and ifdown(8)
        #auto lo
        #iface lo inet loopback
        auto eno1
        iface eno1 inet static
        address 192.168.1.111
        netmask 255.255.0.0
        gateway 192.168.1.1
        dns-nameservers 114.114.114.114


## 重装 2周目

    选最小化安装。不然老是装上一些太新版本的包，影响后续的包的安装。

        ubuntu-drivers devices

        apt-get build-dep build-essential

    https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html
        
        lspci | grep -i nvidia

        uname -m && cat /etc/*release

        gcc --version


    An NVIDIA kernel module 'nvidia-drm' appears to already be loaded in your kernel.
        https://askubuntu.com/questions/830916/how-to-install-cuda-8-0-on-ubuntu-16-04-with-nvidia-geforce-gtx-1080

        nvidia-smi
        apt-get purge nvidia-cuda*
        apt-get purge nvidia-*
        service lightdm stop
        lsof | grep nvidia


    mount /dev/sda1 /data

    cd /data/ayiis/

    sh cuda_10.0.130_410.48_linux.run

    nvidia-smi 只显示 1/2 张显卡
    又tm是cuda 和 nvidia 的问题
        https://blog.csdn.net/u012911347/article/details/82733667

        不接显示器的情况下，两张卡都ok了


# 解决一切：

    1. BIOS
        确认存在两张显卡

        -- 上次显卡在搬动过程中松了，重新插拔就好了

    2. lshw -C display
        确认 生效的显卡是 nvidia 的显卡
        intel的独显 可能不显示

        如果有 *-display UNCLAIMED --> 不正常

            可能是 内核版本tmd莫名其妙更新了 导致n卡的驱动不兼容（可能跟cuda也有关）

            看看 
                find /lib/modules/* -type f -name "*.ko" | grep radeon
                dpkg --get-selections |grep linux-image

            删除内核（NO）

                删除当前版本重启会使用低一级的已安装内核，如果全删了重启会进入bios
                sudo apt-get remove linux-image-4.4.0-75-generic

            切换内核

                grep menuentry /boot/grub/grub.cfg | grep -v "recovery mode"

                --> Ubuntu, with Linux 4.18.0-15-generic

                vi /etc/default/grub
                    GRUB_DEFAULT="Advanced options for Ubuntu>Ubuntu, with Linux 4.18.0-15-generic"

                grub-mkconfig -o /boot/grub/grub.cfg

                reboot

            -- 解决这个问题后，整个世界都正常了


    3. ubuntu-drivers devices
        看驱动是否有 nvidia 的显卡驱动

    4. nvidia-smi
        看nvidia驱动是否ready

    如果前4步正常了，理论上cuda就是正常的
    如果不正常，进入下面的重装步骤

    !重装时，选最小化安装，然后不安装显卡，直接安装cuda，因为cuda里面已经包含有nvidia的显卡

        实践时，
            我先在GUI界面的升级管理安装了 nvidia的 430 驱动
            安装cuda时报错提示 nvidia已经存在
            purge 了 nvidia 的驱动
            重新执行cuda安装程序
            安装成功

    5. 关闭 gdm 和 xorg 如果 nvidia-smi里面有占用

        sudo service gdm stop
        sudo service lightdm stop

    6. 关键的一步

        所有自动更新的玩意全部关闭

            - 否则连内核都给自动更新了，几乎一定会导致nvidia的驱动启动失败

        cat /etc/apt/apt.conf.d/10periodic
            APT::Periodic::Update-Package-Lists "0";
            APT::Periodic::Download-Upgradeable-Packages "0";
            APT::Periodic::AutocleanInterval "0";
            APT::Periodic::Unattended-Upgrade "0";

        cat /etc/apt/apt.conf.d/20auto-upgrades
            APT::Periodic::Update-Package-Lists "0";
            APT::Periodic::Download-Upgradeable-Packages "0";
            APT::Periodic::AutocleanInterval "0";
            APT::Periodic::Unattended-Upgrade "0";

        reboot

    折腾了N遍的cuda驱动，完结撒花


    (重装DNN之后) 界面登陆失败：
        登陆界面 ctrl + alt + 1~7 => 打开shell
        tail /var/log/auth.log -f
        tail /var/log/syslog
        cat /home/ayiis/.local/share/xorg/Xorg.0.log
        cat ~/.xsession_error.log

        https://unix.stackexchange.com/questions/246508/x-server-only-starts-as-root
        https://bbs.archlinux.org/viewtopic.php?id=185597
        https://unix.stackexchange.com/questions/149985/startx-cannot-open-dev-fb0-permission-denied

        最终解决的方案：

            vi /etc/X11/Xwrapper.config

                allowed_users=anybody
                needs_root_rights=yes
