---
layout: post
title: "配置iis7.5显示php脚本错误"
date:   2013-08-27 10:43:12
categories:
- Notes
tags:
- IIS
- PHP

---

如何配置IIS7.5显示PHP错误信息而非莫名其妙简单的500错误代码呢？

### 步骤1 - 配置IIS PHP Manager

	打开“IIS管理器”
	-->点击“服务器”节点
		-->点击“PHP管理器(IIS Manager)”
			-->点击“Configure Error Reporting”,选中“Development Machine”。

注：如果你没看到PHP管理器，可以通过[WPI](http://www.microsoft.com/web/downloads/platform.aspx)(Web Platform Installer)进行安装。

### 步骤2 - IIS配置编辑器 （IIS Configuration Editor）

	system.WebServer/httpErrors
	errorMode - "DetailedLocalOnly" Change To: "Detailed"
	existingResponse - "Auto" Change To: "PassThrough"
	
### 步骤3 - php.ini配置

	display_errors = On
	log_errors = On
	error_reporting = E_ALL | E_STRICT
	
	然后重启iis。

### 配置错误日志目录权限

	注：如果上面步骤1-3还不行，则进行步骤4的操作。

	默认情况下windows iis安装php模块的话，错误日志会在Windows/Temp目录下，所以需要给该目录开IUSER、IIS_IUSERS、Network Service的修改权限。
	
### 参考文章
 
 [Enabling IIS 7.5 and PHP Errors on Windows 2008 Server R2](http://www.geekmungus.co.uk/microsoft-windows/enablingiis75andphperrorsonwindows2008serverr2)
 