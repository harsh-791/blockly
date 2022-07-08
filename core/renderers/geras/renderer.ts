/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Geras renderer.
 */

/**
 * Geras renderer.
 * @class
 */


/* eslint-disable-next-line no-unused-vars */


import type {BlockSvg} from '../../block_svg';
import {BlockStyle, Theme} from '../../theme';
import * as blockRendering from '../common/block_rendering';
import type {RenderInfo as BaseRenderInfo} from '../common/info';
import {Renderer as BaseRenderer} from '../common/renderer';

import {ConstantProvider} from './constants';
import {Drawer} from './drawer';
import {HighlightConstantProvider} from './highlight_constants';
import {RenderInfo} from './info';
import {PathObject} from './path_object';


/**
 * The geras renderer.
 * @alias Blockly.geras.Renderer
 */
export class Renderer extends BaseRenderer {
  /** The renderer's highlight constant provider. */
  // AnyDuringMigration because:  Type 'null' is not assignable to type
  // 'HighlightConstantProvider'.
  private highlightConstants_: HighlightConstantProvider =
      null as AnyDuringMigration;

  /**
   * @param name The renderer name.
   * @internal
   */
  constructor(name: string) {
    super(name);
  }

  /**
   * Initialize the renderer.  Geras has a highlight provider in addition to
   * the normal constant provider.
   * @internal
   */
  override init(theme: Theme, opt_rendererOverrides: AnyDuringMigration) {
    super.init(theme, opt_rendererOverrides);
    this.highlightConstants_ = this.makeHighlightConstants_();
    this.highlightConstants_.init();
  }

  override refreshDom(svg: SVGElement, theme: Theme) {
    super.refreshDom(svg, theme);
    this.getHighlightConstants().init();
  }

  override makeConstants_() {
    return new ConstantProvider();
  }

  /**
   * Create a new instance of the renderer's render info object.
   * @param block The block to measure.
   * @return The render info object.
   */
  protected override makeRenderInfo_(block: BlockSvg): RenderInfo {
    return new RenderInfo(this, block);
  }

  /**
   * Create a new instance of the renderer's drawer.
   * @param block The block to render.
   * @param info An object containing all information needed to render this
   *     block.
   * @return The drawer.
   */
  protected override makeDrawer_(block: BlockSvg, info: BaseRenderInfo):
      Drawer {
    return new Drawer(block, (info as RenderInfo));
  }

  /**
   * Create a new instance of a renderer path object.
   * @param root The root SVG element.
   * @param style The style object to use for colouring.
   * @return The renderer path object.
   * @internal
   */
  override makePathObject(root: SVGElement, style: BlockStyle): PathObject {
    return new PathObject(
        root, style, (this.getConstants() as ConstantProvider));
  }

  /**
   * Create a new instance of the renderer's highlight constant provider.
   * @return The highlight constant provider.
   */
  protected makeHighlightConstants_(): HighlightConstantProvider {
    return new HighlightConstantProvider((this.getConstants()));
  }

  /**
   * Get the renderer's highlight constant provider.  We assume that when this
   * is called, the renderer has already been initialized.
   * @return The highlight constant provider.
   * @internal
   */
  getHighlightConstants(): HighlightConstantProvider {
    return this.highlightConstants_;
  }
}

blockRendering.register('geras', Renderer);