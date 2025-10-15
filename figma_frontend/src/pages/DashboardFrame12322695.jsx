/**
 * Page: Dashboard - frame (Figma 123:22695)
 * Target: React 18 (CRA)
 * Purpose:
 *   - Render the extracted static HTML in a React view with pixel-perfect fidelity.
 *   - Preserve absolute positioning, design tokens, and CSS from the extracted assets.
 *   - Provide DPR-aware scale-to-fit behavior with proper cleanup on unmount.
 *   - Normalize image paths to /assets/figmaimages to prevent broken links.
 *   - Ensure accessibility: skip link, roles, aria-labels remain intact.
 *
 * Notes:
 *   - The underlying markup is injected as-is into the scale container to avoid JSX style conversion noise
 *     and to keep absolute positioning exact. This is safe given the static, controlled content.
 *   - All images are expected under /assets/figmaimages/. Missing assets will simply not load; no console errors are thrown.
 */

import React, { useEffect, useRef } from "react";
import "../styles/dashboard-frame-123-22695.css";
import { useScaleToFit } from "../utils/useScaleToFit";

// PUBLIC_INTERFACE
export default function DashboardFrame12322695() {
  /**
   * Container for the scale wrapper. The innerHTML will contain the <main id="screen-123-22695">...</main>
   * structure from the extracted HTML.
   */
  const containerRef = useRef(null);

  // Apply DPR-safe scale-to-fit with the design size from Figma (1920 x 1600)
  useScaleToFit(containerRef, {
    designWidth: 1920,
    designHeight: 1600,
    dprSnap: true,
    centerHorizontally: true,
  });

  /**
   * Normalize image src attributes to /assets/figmaimages/, and ensure width/height to reduce CLS.
   */
  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    // Normalize relative figmaimages/* to /assets/figmaimages/*
    const normalizeAssetPaths = () => {
      try {
        const imgs = host.querySelectorAll("img");
        imgs.forEach((img) => {
          const src = img.getAttribute("src") || "";
          if (/^figmaimages\//.test(src)) {
            img.setAttribute("src", `/assets/${src.replace(/^figmaimages\//, "figmaimages/")}`);
          }
        });
      } catch {
        // noop
      }
    };

    // Ensure dimensions on images using inline styles/computed styles
    const ensureImageDimensions = () => {
      try {
        const imgs = host.querySelectorAll("img");
        imgs.forEach((img) => {
          const hasWidth = img.hasAttribute("width");
          const hasHeight = img.hasAttribute("height");
          if (!hasWidth || !hasHeight) {
            // Prefer inline style dimensions if present
            let sw = img.style?.width ? parseFloat(img.style.width) : 0;
            let sh = img.style?.height ? parseFloat(img.style.height) : 0;
            if ((!sw || !sh) && img.isConnected) {
              const cs = window.getComputedStyle(img);
              sw = sw || parseFloat(cs.width);
              sh = sh || parseFloat(cs.height);
            }
            if (Number.isFinite(sw) && sw > 0 && Number.isFinite(sh) && sh > 0) {
              img.setAttribute("width", String(Math.round(sw)));
              img.setAttribute("height", String(Math.round(sh)));
            }
          }
          if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
          if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
        });
      } catch {
        // noop
      }
    };

    // Apply normalizations after content injection and on the next tick
    normalizeAssetPaths();
    ensureImageDimensions();
    const t = setTimeout(() => {
      normalizeAssetPaths();
      ensureImageDimensions();
    }, 0);

    return () => clearTimeout(t);
  }, []);

  // Inject the static HTML markup. We include the <main> wrapper as provided in the assets HTML.
  const mainMarkup = `
    <main id="screen-123-22695" class="screen" role="main" aria-label="Dashboard - frame">
      <img
        class="bg-guide"
        src="/assets/figmaimages/figma_image_123_22695.png"
        alt=""
        aria-hidden="true"
        width="1920"
        height="1600"
        decoding="async"
        loading="lazy"
      />
      <div id="root-123-22695" class="root-layer" data-node-id="123:22695">
        <div id="bg-123-22702" class="abs block surface" style="left:0px; top:0px; width:250px; height:1600px;"></div>
        <div id="logo-123-22703" class="abs" style="left:39px; top:24px; width:151.311px; height:44.852px;">
          <div class="abs" style="left:0px; top:0px; width:44.852px; height:44.852px;">
            <div class="abs" style="left:0px; top:0px; width:44.852px; height:44.852px;">
              <img src="figmaimages/figma_image_123_22706.svg" alt="" class="abs" style="left:0px; top:0px; width:44.852px; height:44.852px;">
              <img src="figmaimages/figma_image_123_22707.svg" alt="" class="abs" style="left:10.830px; top:3.476px; width:30.546px; height:30.546px;">
              <div class="abs fill-7fd4fe" style="left:25.015px; top:13.220px; width:6.415px; height:14.989px; border-radius:2px;"></div>
              <img src="figmaimages/figma_image_123_22709.svg" alt="" class="abs" style="left:4.156px; top:4.156px; width:36.540px; height:34.455px;">
              <img src="figmaimages/figma_image_123_22710.svg" alt="" class="abs" style="left:4.156px; top:10.348px; width:13.348px; height:28.108px;">
              <img src="figmaimages/figma_image_123_22711.svg" alt="" class="abs" style="left:9.510px; top:3.996px; width:31.186px; height:36.565px;">
              <img src="figmaimages/figma_image_123_22712.svg" alt="" class="abs" style="left:19.256px; top:9.987px; width:21.441px; height:30.722px;">
              <div class="abs fill-7fd4fe" style="left:21.828px; top:37.012px; width:1.402px; height:1.402px; border-radius:1px;"></div>
              <div class="abs fill-b2e5ff" style="left:23.527px; top:34.178px; width:1.402px; height:1.402px; border-radius:1px;"></div>
            </div>
          </div>
          <span class="abs text typo-55 color-131417" style="left:57.312px; top:8.426px; width:94px; height:28px;">ZenSocial</span>
        </div>

        <div id="menus-123-22716" class="abs s-sidebar" role="navigation" aria-label="Sidebar navigation" style="left:16px; top:105px; width:218px; height:1459px;">
          <div class="abs" style="left:0px; top:0px; width:218px; height:702px;">
            <div class="abs" style="left:0px; top:0px; width:218px; height:216px;">
              <div class="menu-item active" style="left:0px; top:0px; width:218px; height:54px;">
                <img src="figmaimages/figma_image_123_22719_248_19752.svg" alt="" class="icon" style="left:12px; top:6px; width:22px; height:22px;">
                <img src="figmaimages/figma_image_123_22719_248_19752_1520_23039.svg" alt="" class="icon inner" style="left:14.75px; top:8.75px; width:16.5px; height:16.5px;">
                <span class="label typo-56 color-01a9fc" style="left:46px; top:6px;">Overview</span>
              </div>
              <div class="menu-item" style="left:0px; top:44px; width:218px; height:54px;">
                <img src="figmaimages/figma_image_123_22720_248_19747.svg" alt="" class="icon" style="left:12px; top:60px; width:22px; height:22px;">
                <span class="label typo-57 color-131417" style="left:46px; top:60px;">Tasks</span>
              </div>
              <div class="menu-item" style="left:0px; top:98px; width:218px; height:54px;">
                <img src="figmaimages/figma_image_123_22721_248_19747.svg" alt="" class="icon" style="left:12px; top:114px; width:22px; height:22px;">
                <img src="figmaimages/figma_image_123_22721_248_19747_1520_66557.svg" alt="" class="icon inner" style="left:13.833px; top:118.583px; width:18.333px; height:12.833px;">
                <span class="label typo-57 color-131417" style="left:46px; top:114px;">Team</span>
              </div>
              <div class="menu-item" style="left:0px; top:152px; width:218px; height:54px;">
                <img src="figmaimages/figma_image_123_22722_248_19747.svg" alt="" class="icon" style="left:12px; top:168px; width:22px; height:22px;">
                <img src="figmaimages/figma_image_123_22722_248_19747_1520_30370.svg" alt="" class="icon inner" style="left:13.833px; top:169.833px; width:18.333px; height:18.333px;">
                <span class="label typo-57 color-131417" style="left:46px; top:168px;">Messages</span>
              </div>
            </div>

            <div class="abs" style="left:0px; top:206px; width:218px; height:270px;">
              <div class="menu-item" style="left:0px; top:0px; width:218px; height:54px;">
                <img src="figmaimages/figma_image_123_22724_237_18794.svg" alt="" class="icon" style="left:12px; top:16px; width:22px; height:22px;">
                <span class="label typo-57 color-131417" style="left:46px; top:16px;">Statistics</span>
                <img src="figmaimages/figma_image_123_22724_248_19723.svg" alt="" class="icon" style="left:180px; top:16px; width:22px; height:22px;">
              </div>
              <div class="menu-item" style="left:0px; top:54px; width:218px; height:54px;">
                <span class="label typo-57 color-131417" style="left:46px; top:70px;">Tiktok</span>
              </div>
              <div class="menu-item" style="left:0px; top:108px; width:218px; height:54px;">
                <span class="label typo-57 color-131417" style="left:46px; top:124px;">OnlyFans</span>
              </div>
              <div class="menu-item" style="left:0px; top:162px; width:218px; height:54px;">
                <span class="label typo-57 color-131417" style="left:46px; top:178px;">Youtube</span>
              </div>
              <div class="menu-item" style="left:0px; top:216px; width:218px; height:54px;">
                <span class="label typo-57 color-131417" style="left:46px; top:232px;">Instagram</span>
              </div>
            </div>

            <div class="abs" style="left:0px; top:476px; width:218px; height:216px;">
              <div class="menu-item" style="left:0px; top:0px; width:218px; height:54px;">
                <img src="figmaimages/figma_image_123_22730_237_18794.svg" alt="" class="icon" style="left:12px; top:16px; width:22px; height:22px;">
                <span class="label typo-57 color-131417" style="left:46px; top:16px;">Tracking</span>
                <img src="figmaimages/figma_image_123_22730_248_19723.svg" alt="" class="icon" style="left:180px; top:16px; width:22px; height:22px;">
              </div>
              <div class="menu-item" style="left:0px; top:54px; width:218px; height:54px;">
                <span class="label typo-57 color-131417" style="left:46px; top:70px;">Schedules</span>
              </div>
              <div class="menu-item" style="left:0px; top:108px; width:218px; height:54px;">
                <span class="label typo-57 color-131417" style="left:46px; top:124px;">Settings</span>
              </div>
              <div class="menu-item" style="left:0px; top:162px; width:218px; height:54px;">
                <span class="label typo-57 color-131417" style="left:46px; top:178px;">Support</span>
              </div>
            </div>
          </div>
        </div>

        <div id="header-123-22839" class="abs header" role="banner" aria-label="Top header" style="left:251px; top:0px; width:1669px; height:88px;">
          <div class="abs" style="left:24px; top:24px; width:450px; height:40px;">
            <div class="abs card" style="left:0px; top:0px; width:450px; height:40px;"></div>
            <img src="figmaimages/figma_image_123_22842.svg" alt="" class="abs" style="left:418px; top:9px; width:22px; height:22px;">
            <span class="abs typo-69 color-999daa" style="left:15px; top:11px; width:200px; height:18px;">Search...</span>
          </div>
          <div class="abs" style="left:1400px; top:24px; width:245px; height:40px;">
            <div class="abs" style="left:0px; top:0px; width:40px; height:40px;">
              <div class="abs card" style="left:0px; top:0px; width:40px; height:40px; border-radius:10px;"></div>
              <img src="figmaimages/figma_image_123_22847.svg" alt="" class="abs" style="left:9px; top:9px; width:22px; height:22px;">
              <div class="abs dot-red" style="left:22px; top:9px; width:6px; height:6px; border-radius:50%;"></div>
            </div>
            <div class="abs" style="left:52px; top:0px; width:193px; height:40px;">
              <div class="abs card" style="left:0px; top:0px; width:193px; height:40px; border-radius:8px;"></div>
              <img src="/assets/figmaimages/figma_image_123_22851.png" alt="Avatar" class="abs" style="left:5px; top:5px; width:30px; height:30px; border-radius:8px; object-fit:cover;">
              <span class="abs typo-70 color-131417" style="left:46px; top:10px; width:110px; height:20px;">Darrell Steward</span>
              <img src="figmaimages/figma_image_123_22842.svg" alt="" class="abs rotate-90" style="left:166px; top:9px; width:22px; height:22px;">
            </div>
          </div>
        </div>

        <div id="title-123-22734" class="abs" style="left:274px; top:112px; width:1622px; height:40px;">
          <span class="abs typo-63 color-131417" style="left:0px; top:5px; width:1295px; height:30px;">Hi, Darell Steward</span>

          <div class="abs select" style="left:1295px; top:0px; width:162px; height:40px;">
            <div class="abs input" style="left:0px; top:0px; width:162px; height:40px;"></div>
            <img class="abs avatar24" src="/assets/figmaimages/figma_image_123_22737_1649_7557_1650_13765_117_13428_117_13422.png" alt="Skylar" style="left:12px; top:5px; width:24px; height:24px;">
            <span class="abs typo-59 color-131417" style="left:46px; top:10px; width:76px; height:20px;">Skylar</span>
            <span class="abs caret" style="left:136px; top:9px; width:22px; height:22px;"></span>
          </div>

          <div class="abs select" style="left:1469px; top:1px; width:153px; height:38px;">
            <div class="abs input" style="left:0px; top:0px; width:153px; height:38px;"></div>
            <span class="abs typo-59 color-131417" style="left:12px; top:9px; width:99px; height:20px;">Last 7 Days</span>
            <span class="abs caret" style="left:131px; top:8px; width:22px; height:22px;"></span>
          </div>
        </div>

        <div id="insight-123-22739" class="abs card-bordered" style="left:274px; top:168px; width:803px; height:142px;">
          <div class="abs" style="left:24px; top:24px; width:152.75px; height:94px;">
            <div class="abs" style="left:0px; top:0px; width:152.75px; height:24px;">
              <img src="figmaimages/figma_image_123_22740_9_689.svg" alt="" class="abs" style="left:0px; top:0px; width:24px; height:24px;">
              <span class="abs typo-60 color-131417" style="left:32px; top:3px; width:120.75px; height:18px;">Tiktok</span>
            </div>
            <div class="abs" style="left:0px; top:42px; width:152.75px; height:52px;">
              <span class="abs typo-58 color-131417" style="left:0px; top:0px; width:152.75px; height:30px;">420K</span>
              <div class="abs" style="left:0px; top:34px; width:152.75px; height:18px;">
                <span class="abs typo-61 color-131417" style="left:0px; top:0px; width:54px; height:18px;">Followers</span>
                <img src="figmaimages/figma_image_123_22740_9_726_1520_29220.svg" alt="" class="abs" style="left:58px; top:2px; width:14px; height:14px;">
                <span class="abs typo-62 color-00bfff" style="left:77px; top:0px; width:77.75px; height:18px;">12%</span>
              </div>
            </div>
          </div>
          <div class="abs divider-y" style="left:200.75px; top:24px; width:1px; height:94px;"></div>
          <div class="abs" style="left:224.75px; top:24px; width:152.75px; height:94px;">
            <div class="abs" style="left:0px; top:0px; width:152.75px; height:24px;">
              <img src="figmaimages/figma_image_123_22742_9_689_9_442.svg" alt="" class="abs" style="left:0px; top:0px; width:24px; height:24px;">
              <img src="figmaimages/figma_image_123_22742_9_689_9_443.svg" alt="" class="abs" style="left:5.793px; top:5.793px; width:12.415px; height:12.414px;">
              <span class="abs typo-60 color-131417" style="left:32px; top:3px; width:120.75px; height:18px;">Instagram</span>
            </div>
            <div class="abs" style="left:0px; top:42px; width:152.75px; height:52px;">
              <span class="abs typo-58 color-131417" style="left:0px; top:0px; width:152.75px; height:30px;">980K</span>
              <div class="abs" style="left:0px; top:34px; width:152.75px; height:18px;">
                <span class="abs typo-61 color-131417" style="left:0px; top:0px; width:54px; height:18px;">Followers</span>
                <span class="abs typo-62 color-00bfff" style="left:77px; top:0px; width:77.75px; height:18px;">20%</span>
              </div>
            </div>
          </div>
          <div class="abs divider-y" style="left:401.5px; top:24px; width:1px; height:94px;"></div>
          <div class="abs" style="left:425.5px; top:24px; width:152.75px; height:94px;">
            <div class="abs" style="left:0px; top:0px; width:152.75px; height:24px;">
              <img src="figmaimages/figma_image_123_22744_9_689_9_491.svg" alt="" class="abs" style="left:0px; top:3.609px; width:24px; height:16.804px;">
              <span class="abs typo-60 color-131417" style="left:32px; top:3px; width:120.75px; height:18px;">Youtube</span>
            </div>
            <div class="abs" style="left:0px; top:42px; width:152.75px; height:52px;">
              <span class="abs typo-58 color-131417" style="left:0px; top:0px; width:152.75px; height:30px;">230K</span>
              <div class="abs" style="left:0px; top:34px; width:152.75px; height:18px;">
                <span class="abs typo-61 color-131417" style="left:0px; top:0px; width:94px; height:18px;">Subscribers</span>
                <span class="abs typo-62 color-00bfff" style="left:77px; top:0px; width:68.75px; height:18px;">53%</span>
              </div>
            </div>
          </div>
          <div class="abs divider-y" style="left:602.25px; top:24px; width:1px; height:94px;"></div>
          <div class="abs" style="left:626.25px; top:24px; width:152.75px; height:94px;">
            <div class="abs" style="left:0px; top:0px; width:152.75px; height:24px;">
              <div class="abs onlyfans-badge" style="left:0px; top:0px; width:24px; height:24px;"></div>
              <span class="abs typo-60 color-131417" style="left:32px; top:3px; width:120.75px; height:18px;">Only Fans</span>
            </div>
            <div class="abs" style="left:0px; top:42px; width:152.75px; height:52px;">
              <span class="abs typo-58 color-131417" style="left:0px; top:0px; width:152.75px; height:30px;">670K</span>
              <div class="abs" style="left:0px; top:34px; width:152.75px; height:18px;">
                <span class="abs typo-61 color-131417" style="left:0px; top:0px; width:94px; height:18px;">Subscribers</span>
                <span class="abs typo-62 color-00bfff" style="left:77px; top:0px; width:68.75px; height:18px;">25%</span>
              </div>
            </div>
          </div>
        </div>

        <div id="followers-123-22747" class="abs card-bordered" style="left:274px; top:326px; width:803px; height:496px;">
          <div class="abs" style="left:20px; top:24px; width:763px; height:38px;">
            <span class="abs typo-63 color-131417" style="left:0px; top:5px; width:200px; height:28px;">Followers</span>
            <div class="abs select" style="left:613px; top:0px; width:150px; height:38px;">
              <div class="abs input" style="left:0px; top:0px; width:150px; height:38px;"></div>
              <div class="abs tiktok-mini" style="left:12px; top:8px; width:22px; height:22px;"></div>
              <span class="abs typo-59 color-131417" style="left:46px; top:9px; width:66px; height:20px;">Tiktok</span>
              <span class="abs caret" style="left:128px; top:8px; width:22px; height:22px;"></span>
            </div>
          </div>

          <div class="abs" style="left:20px; top:112px; width:763px; height:70px;">
            <div class="abs tab active" style="left:0px; top:0px; width:187px; height:70px;">
              <span class="abs typo-57 color-131417" style="left:0px; top:0px; width:154px; height:22px;">Net Growth</span>
              <span class="abs hint typo-64 color-686d7d" style="left:0px; top:23px; width:133px; height:22px;">Jun 2023 - Dec 2023</span>
            </div>
            <div class="abs mini-insight active" style="left:170px; top:0px; width:187px; height:70px;">
              <div class="abs up-chip" style="left:12px; top:12px; width:24px; height:24px;"></div>
              <span class="abs typo-60 color-131417" style="left:12px; top:38px; width:60px; height:18px;">Growth</span>
              <span class="abs typo-65 color-01a9fc" style="left:80px; top:12px; width:95px; height:24px;">23,430</span>
              <span class="abs typo-61 color-131417" style="left:80px; top:38px; width:29px; height:18px;">+412</span>
              <span class="abs typo-62 color-00bfff" style="left:143px; top:38px; width:45px; height:18px;">23%</span>
            </div>
            <div class="abs mini-insight" style="left:473px; top:0px; width:187px; height:70px;">
              <span class="abs typo-60 color-131417" style="left:12px; top:38px; width:60px; height:18px;">Follow</span>
              <span class="abs typo-66 color-131417" style="left:80px; top:12px; width:95px; height:24px;">25,592</span>
              <span class="abs typo-61 color-131417" style="left:80px; top:38px; width:29px; height:18px;">+804</span>
              <span class="abs typo-62 color-00bfff" style="left:143px; top:38px; width:45px; height:18px;">23%</span>
            </div>
            <div class="abs mini-insight" style="left:676px; top:0px; width:187px; height:70px;">
              <span class="abs typo-60 color-131417" style="left:12px; top:38px; width:60px; height:18px;">Unfolow</span>
              <span class="abs typo-66 color-131417" style="left:80px; top:12px; width:95px; height:24px;">100</span>
              <span class="abs typo-61 color-131417" style="left:80px; top:38px; width:13px; height:18px;">-4</span>
              <span class="abs typo-62 color-00bfff" style="left:143px; top:38px; width:61px; height:18px;">2.2%</span>
            </div>
          </div>

          <div class="abs" style="left:20px; top:200px; width:763px; height:300px;">
            <span class="abs typo-61 color-131417" style="left:32px; top:255px; width:8px; height:18px;">0</span>
            <span class="abs typo-61 color-131417" style="left:9px; top:204px; width:32px; height:18px;">1.500</span>
            <span class="abs typo-61 color-131417" style="left:9px; top:153px; width:29px; height:18px;">3000</span>
            <span class="abs typo-61 color-131417" style="left:1px; top:102px; width:39px; height:18px;">15.000</span>
            <span class="abs typo-61 color-131417" style="left:0px; top:51px; width:39px; height:18px;">25.000</span>
            <span class="abs typo-61 color-131417" style="left:0px; top:0px; width:39px; height:18px;">50.000</span>

            <div class="abs grid-line" style="left:83px; top:255px; width:694px;"></div>
            <div class="abs grid-line" style="left:83px; top:230px; width:694px;"></div>
            <div class="abs grid-line" style="left:83px; top:204px; width:694px;"></div>
            <div class="abs grid-line" style="left:83px; top:179px; width:694px;"></div>
            <div class="abs grid-line" style="left:83px; top:153px; width:694px;"></div>
            <div class="abs grid-line" style="left:83px; top:128px; width:694px;"></div>
            <div class="abs grid-line" style="left:83px; top:102px; width:694px;"></div>
            <div class="abs grid-line" style="left:83px; top:77px; width:694px;"></div>
            <div class="abs grid-line" style="left:83px; top:51px; width:694px;"></div>
            <div class="abs grid-line" style="left:83px; top:26px; width:694px;"></div>
            <div class="abs grid-line" style="left:83px; top:0px; width:694px;"></div>

            <div class="abs dot" style="left:78px; top:252px;"></div>
            <div class="abs dot" style="left:78px; top:201px;"></div>
            <div class="abs dot" style="left:78px; top:150px;"></div>
            <div class="abs dot" style="left:78px; top:99px;"></div>
            <div class="abs dot" style="left:78px; top:48px;"></div>
            <div class="abs dot" style="left:78px; top:-3px;"></div>

            <div class="abs" style="left:111px; top:26px; width:668px; height:229px;">
              <div class="abs bar" style="left:0px; bottom:0px; width:26px; height:141px;"></div>
              <div class="abs bar" style="left:101px; bottom:0px; width:26px; height:229px;"></div>
              <div class="abs bar" style="left:202px; bottom:0px; width:26px; height:179px;"></div>
              <img src="figmaimages/figma_image_123_22790.svg" alt="" class="abs" style="left:303px; bottom:0px; width:26px; height:63px;">
              <div class="abs bar" style="left:404px; bottom:0px; width:26px; height:119px;"></div>
              <div class="abs bar" style="left:505px; bottom:0px; width:26px; height:187px;"></div>
              <div class="abs bar" style="left:606px; bottom:0px; width:26px; height:187px;"></div>
            </div>

            <div class="abs months" style="left:120px; top:279px; width:645px; height:18px;">
              <span class="m typo-67 color-686d7d" style="left:0px;">Dec 18</span>
              <span class="m typo-68 color-686d7d" style="left:101px;">Dec 19</span>
              <span class="m typo-68 color-686d7d" style="left:202px;">Dec 20</span>
              <span class="m typo-68 color-686d7d" style="left:303px;">Dec 21</span>
              <span class="m typo-68 color-686d7d" style="left:404px;">Dec 22</span>
              <span class="m typo-68 color-686d7d" style="left:505px;">Dec 23</span>
              <span class="m typo-68 color-686d7d" style="left:606px;">Dec 24</span>
            </div>
          </div>
        </div>

        <div id="revenues-123-22802" class="abs card-bordered" style="left:274px; top:838px; width:807px; height:402px;">
          <div class="abs" style="left:24px; top:16px; width:756px; height:50px;">
            <div class="abs" style="left:0px; top:0px; width:486.5px; height:50px;">
              <span class="abs typo-63 color-131417" style="left:0px; top:0px; width:200px; height:28px;">Revenues</span>
              <span class="abs typo-57 color-131417" style="left:0px; top:28px; width:200px; height:22px;">$12,390</span>
            </div>
            <div class="abs select" style="left:606px; top:6px; width:150px; height:38px;">
              <div class="abs input" style="left:0px; top:0px; width:150px; height:38px;"></div>
              <span class="abs typo-59 color-131417" style="left:42px; top:9px; width:66px; height:20px;">Onlyfans</span>
              <span class="abs caret" style="left:128px; top:8px; width:22px; height:22px;"></span>
            </div>
          </div>

          <div class="abs" style="left:24px; top:86px; width:759px; height:300px;">
            <span class="abs typo-61 color-131417" style="left:38px; top:255px;">0</span>
            <span class="abs typo-61 color-131417" style="left:5px; top:204px;">$2,000</span>
            <span class="abs typo-61 color-131417" style="left:5px; top:153px;">$4,000</span>
            <span class="abs typo-61 color-131417" style="left:5px; top:102px;">$6,000</span>
            <span class="abs typo-61 color-131417" style="left:5px; top:51px;">$8,000</span>
            <span class="abs typo-61 color-131417" style="left:0px; top:0px;">$10,000</span>

            <div class="abs grid-line" style="left:69px; top:258px; width:690px;"></div>
            <div class="abs grid-line" style="left:69px; top:207px; width:690px;"></div>
            <div class="abs grid-line" style="left:69px; top:156px; width:690px;"></div>
            <div class="abs grid-line" style="left:69px; top:105px; width:690px;"></div>
            <div class="abs grid-line" style="left:69px; top:54px; width:690px;"></div>
            <div class="abs grid-line" style="left:69px; top:3px; width:690px;"></div>

            <div class="abs dot" style="left:66px; top:255px;"></div>
            <div class="abs dot" style="left:66px; top:204px;"></div>
            <div class="abs dot" style="left:66px; top:153px;"></div>
            <div class="abs dot" style="left:66px; top:102px;"></div>
            <div class="abs dot" style="left:66px; top:51px;"></div>
            <div class="abs dot" style="left:66px; top:0px;"></div>

            <div class="abs line-plot" style="left:79px; top:77px; width:657px; height:160px;"></div>

            <div class="abs months" style="left:90px; top:279px; width:645px; height:18px;">
              <span class="m typo-67 color-686d7d" style="left:0px;">Dec 18</span>
              <span class="m typo-68 color-686d7d" style="left:101px;">Dec 19</span>
              <span class="m typo-68 color-686d7d" style="left:202px;">Dec 20</span>
              <span class="m typo-68 color-686d7d" style="left:303px;">Dec 21</span>
              <span class="m typo-68 color-686d7d" style="left:404px;">Dec 22</span>
              <span class="m typo-68 color-686d7d" style="left:505px;">Dec 23</span>
              <span class="m typo-68 color-686d7d" style="left:606px;">Dec 24</span>
            </div>
          </div>
        </div>

        <div id="activities-123-22855" class="abs card-16" style="left:1092px; top:168px; width:804px; height:492px;">
          <div class="abs" style="left:24px; top:16px; width:756px; height:28px;">
            <span class="abs typo-63 color-131417" style="left:0px; top:0px; width:200px; height:28px;">All Activities</span>
            <span class="abs typo-56 color-01a9fc" style="left:703px; top:3px; width:53px; height:22px;">See All</span>
          </div>

          <div class="abs tabs" style="left:24px; top:64px; width:756px; height:46px;">
            <div class="abs tab" style="left:0px; top:0px; width:252px; height:46px;">
              <span class="abs typo-71 color-686d7d" style="left:93.5px; top:12px;">Inbox</span>
              <div class="abs count red" style="left:135.5px; top:11px; width:23px; height:22px;">
                <span class="abs typo-72 color-ffffff" style="left:4px; top:2px;">82</span>
              </div>
            </div>
            <div class="abs tab active" style="left:252px; top:0px; width:252px; height:46px;">
              <span class="abs typo-73 color-01a9fc" style="left:81.5px; top:12px;">Activities</span>
              <div class="abs count red" style="left:147.5px; top:11px; width:23px; height:22px;">
                <span class="abs typo-72 color-ffffff" style="left:4px; top:2px;">13</span>
              </div>
              <div class="abs tab-underline"></div>
            </div>
            <div class="abs tab" style="left:504px; top:0px; width:252px; height:46px;">
              <span class="abs typo-71 color-686d7d" style="left:80px; top:12px;">Followers</span>
              <div class="abs count red" style="left:149px; top:11px; width:23px; height:22px;">
                <span class="abs typo-72 color-ffffff" style="left:4px; top:2px;">4</span>
              </div>
            </div>
          </div>

          <div class="abs" style="left:24px; top:126px; width:756px; height:350px;">
            <div class="abs list-row" style="left:0px; top:0px; width:756px; height:60px;">
              <div class="abs avatar32" style="left:0px; top:0px;">
                <img src="/assets/figmaimages/figma_image_123_22862_11_2181_117_13427_117_13422.png" alt="Avatar" class="fit">
              </div>
              <div class="abs" style="left:44px; top:0px; width:712px; height:48px;">
                <span class="abs typo-74 color-131417" style="left:0px; top:0px;">@Bryan12 Started following you</span>
                <span class="abs action typo-75 color-01a9fc" style="left:668px; top:0px;">Follow</span>
                <span class="abs time typo-76 color-686d7d" style="left:0px; top:32px;">15 min ago</span>
                <div class="abs chip ig" style="left:633px; top:32px;">
                  <span class="typo-77 color-131417">Instagram</span>
                </div>
              </div>
            </div>

            <div class="abs list-row" style="left:0px; top:68px; width:756px; height:60px;">
              <div class="abs avatar32" style="left:0px; top:0px;"></div>
              <div class="abs" style="left:44px; top:0px; width:712px; height:48px;">
                <span class="abs typo-74 color-131417" style="left:0px; top:0px;">@jamjam Started following you</span>
                <span class="abs action typo-75 color-01a9fc" style="left:668px; top:0px;">Follow</span>
                <span class="abs time typo-76 color-686d7d" style="left:0px; top:32px;">16 min ago</span>
                <div class="abs chip tk" style="left:655px; top:32px;">
                  <span class="typo-77 color-131417">Tiktok</span>
                </div>
              </div>
              <img src="/assets/figmaimages/figma_image_123_22864_11_2132.png" alt="" class="abs right-rect" style="left:711px; top:0px; width:45px; height:60px;">
            </div>

            <div class="abs list-row tall" style="left:0px; top:146px; width:756px; height:78px;">
              <div class="abs avatar32" style="left:0px; top:0px;"></div>
              <div class="abs" style="left:44px; top:0px; width:712px; height:66px;">
                <span class="abs multiline typo-74 color-131417" style="left:0px; top:0px;">@jamjam Commented on your post:
amazing, love it</span>
                <span class="abs time typo-76 color-686d7d" style="left:0px; top:50px;">18 min ago</span>
                <div class="abs chip tk" style="left:586px; top:50px;">
                  <span class="typo-77 color-131417">Tiktok</span>
                </div>
              </div>
            </div>

            <div class="abs list-row" style="left:0px; top:232px; width:756px; height:60px;">
              <div class="abs avatar32" style="left:0px; top:0px;"></div>
              <div class="abs" style="left:44px; top:0px; width:712px; height:48px;">
                <span class="abs typo-74 color-131417" style="left:0px; top:0px;">@mic23 Started following you</span>
                <span class="abs action typo-75 color-01a9fc" style="left:668px; top:0px;">Follow</span>
                <span class="abs time typo-76 color-686d7d" style="left:0px; top:32px;">20 min ago</span>
                <div class="abs chip ig" style="left:633px; top:32px;">
                  <span class="typo-77 color-131417">Instagram</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="instagram-123-22880" class="abs card-bordered" style="left:274px; top:1083px; width:803px; height:337px;">
          <div class="abs" style="left:20px; top:24px; width:763px; height:38px;">
            <span class="abs typo-63 color-131417" style="left:0px; top:5px; width:200px; height:28px;">Top Countries</span>
            <div class="abs select" style="left:613px; top:0px; width:150px; height:38px;">
              <div class="abs input" style="left:0px; top:0px; width:150px; height:38px;"></div>
              <img src="figmaimages/figma_image_123_22742_9_689_9_442.svg" alt="" class="abs" style="left:12px; top:8px; width:22px; height:22px;">
              <span class="abs typo-59 color-131417" style="left:46px; top:9px; width:80px; height:20px;">Instagram</span>
              <span class="abs caret" style="left:128px; top:8px; width:22px; height:22px;"></span>
            </div>
          </div>

          <div class="abs" style="left:376px; top:86px; width:407px; height:200px;">
            <div class="abs" style="left:0px; top:0px; width:407px; height:38px;">
              <span class="abs typo-81 color-686d7d" style="left:0px; top:0px;">Filipina</span>
              <div class="abs meter" style="left:0px; top:21px; width:365px; height:6px;">
                <div class="track"></div>
                <div class="fill" style="width:292.579px;"></div>
              </div>
              <span class="abs typo-82 color-131417" style="left:373px; top:0px;">12K</span>
            </div>
            <div class="abs" style="left:0px; top:54px; width:407px; height:38px;">
              <span class="abs typo-81 color-686d7d" style="left:0px; top:0px;">Thailand</span>
              <div class="abs meter" style="left:0px; top:21px; width:365px; height:6px;">
                <div class="track"></div>
                <div class="fill" style="width:237.540px;"></div>
              </div>
              <span class="abs typo-82 color-131417" style="left:373px; top:0px;">106k</span>
            </div>
            <div class="abs" style="left:0px; top:108px; width:407px; height:38px;">
              <span class="abs typo-81 color-686d7d" style="left:0px; top:0px;">Japan</span>
              <div class="abs meter" style="left:0px; top:21px; width:365px; height:6px;">
                <div class="track"></div>
                <div class="fill" style="width:92.698px;"></div>
              </div>
              <span class="abs typo-82 color-131417" style="left:373px; top:0px;">16K</span>
            </div>
            <div class="abs" style="left:0px; top:162px; width:407px; height:38px;">
              <span class="abs typo-81 color-686d7d" style="left:0px; top:0px;">Rusia</span>
              <div class="abs meter" style="left:0px; top:21px; width:365px; height:6px;">
                <div class="track"></div>
                <div class="fill" style="width:202px;"></div>
              </div>
              <span class="abs typo-82 color-131417" style="left:373px; top:0px;">16K</span>
            </div>
          </div>

          <div class="abs map-placeholder" style="left:20px; top:86px; width:346px; height:231px;"></div>
        </div>
      </div>
    </main>
  `;

  // Inject and update document title once when the page mounts
  useEffect(() => {
    const host = containerRef.current;
    if (host) {
      host.innerHTML = mainMarkup;
    }
    const prevTitle = document.title;
    document.title = "Dashboard - frame (123:22695)";
    return () => {
      // Clean container and restore title on unmount
      if (host) host.innerHTML = "";
      document.title = prevTitle;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard-123-22695-page" role="document" aria-label="Dashboard - frame page">
      {/* Skip link for keyboard users */}
      <a href="#screen-123-22695" className="visually-hidden">
        Skip to main content
      </a>

      {/* Scale wrapper: the HTML <main ...> is injected inside via innerHTML above */}
      <div ref={containerRef} className="scale-container" aria-hidden="false" />
    </div>
  );
}
