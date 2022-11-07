#ifndef __ES_API_H__
#define __ES_API_H__

typedef void(__stdcall *VideoSizeChangedCallback)(int newWidth, int newHeight);
typedef void(__stdcall *UpdatePicCallback)(INT_PTR Param);
typedef void(__stdcall *ErrorCallback)(int err);
typedef void(__stdcall *MouseChangeCallback)(int mode);

#ifdef __cplusplus
extern "C"{
#endif

#define BM_LBUTTON		0x01
#define BM_MBUTTON		0x02
#define BM_RBUTTON		0x04
#define BM_UPWHEEL		0x08
#define BM_DOWNWHEEL	0x10
#define BM_SYNC			0x20
	
	int WINAPI ES_RegisterVideoSizeChangedCallback(INT_PTR Handle, VideoSizeChangedCallback cb);
	int WINAPI ES_RegisterUpdatePicCallback(INT_PTR Handle, UpdatePicCallback cb, INT_PTR param);
	int WINAPI ES_RegisterErrCallback(INT_PTR Handle, ErrorCallback cb);
	int WINAPI ES_RegisterMouseChangeCallback(INT_PTR Handle, MouseChangeCallback cb);

	int WINAPI ES_StartSession(LPCSTR Server, int Port, LPCSTR User, LPCSTR Password, INT_PTR& Handle);
	int WINAPI ES_EndSession(INT_PTR Handle);
	int WINAPI ES_SendKey(INT_PTR Handle, unsigned int nChar, int iDown, bool bShiftDown,bool bCapLockDown);
	int WINAPI ES_SetRemoteMouse(INT_PTR Handle, int x,int y, int z, BYTE bMask);

	WORD* WINAPI ES_LockPicture(INT_PTR Handle, int &Size, int &Width, int &Height);
	int WINAPI ES_UnlockPicture(INT_PTR Handle);
	int WINAPI ES_SwitchMouseMode();
	int WINAPI ES_GetMouseMode(INT_PTR Handle);
    int WINAPI ES_SetRemoteMouseAbs(INT_PTR Handle, int x,int y, int z, BYTE bMask);
#ifdef __cplusplus
}
#endif
#endif //__ES_API_H__
